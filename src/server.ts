import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * أي طلب بيبدأ بـ /api → يتحول لباك إند ngrok الحقيقي.
 * لازم يتحط هنا، قبل الـ static files وقبل الـ Angular SSR handler،
 * عشان الطلبات دي متوصلش أبدًا لـ angularApp.handle() اللي كان بيرجعها 404.
 */
app.use('/api', (req, res, next) => {
  // دعم صريح للـ preflight requests (OPTIONS) اللي المتصفح بيبعتها
  // قبل أي POST/PUT/DELETE فيه Content-Type: application/json
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
    return res.sendStatus(204);
  }
  return next();
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://handsaw-lubricant-yogurt.ngrok-free.dev',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    headers: { 'ngrok-skip-browser-warning': 'true' },
  })
);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

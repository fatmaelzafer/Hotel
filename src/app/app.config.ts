import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes ,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // يرجع لفوق مع كل navigation جديد
        anchorScrolling: 'enabled',            // يشتغل مع #fragment links كمان لو عندك
      })
    ), provideClientHydration(withEventReplay()),

  ]
};



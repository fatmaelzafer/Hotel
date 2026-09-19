import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Server },
  { path: 'signup', renderMode: RenderMode.Server },
  { path: 'booking/:id', renderMode: RenderMode.Server },
  { path: 'guestview', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'rooms', renderMode: RenderMode.Server },
  {
    path: 'guestview/roomsearch/:checkOut/:checkIn/:guests', 
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

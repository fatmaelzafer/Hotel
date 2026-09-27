import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { userGuard } from './core/guards/user-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () => import('./core/layouts/components/guest-layout/guest-layout.component').then((c) => c.GuestLayoutComponent),
    canMatch: [guestGuard], // ← canMatch بدل canActivate
    children: [
      { path: 'login', loadComponent: () => import('./core/auth/login/login.components').then((c) => c.LoginComponents) },
      { path: 'signup', loadComponent: () => import('./core/auth/signup/signup.components').then((c) => c.SignupComponents) },
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/guest/guestroom/guestroom').then((c) => c.Guestroom),
        children: [
          { path: 'roomsearch/:checkOut/:checkIn/:guests', loadComponent: () => import('./features/pages/components/contact/contact.page').then((c) => c.ContactPage) },
          { path: 'rooms', loadComponent: () => import('./features/pages/components/rooms/rooms.page').then((c) => c.RoomsPage) },
        ],
      },
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/guestview/guestview').then((c) => c.Guestview),
        children: [
          { path: 'home', loadComponent: () => import('./features/pages/components/home/home.component').then((c) => c.HomeComponent) },
        ],
      },
    ],
  },

  {
    path: '',
    loadComponent: () => import('./core/layouts/components/user-layout/user-layout.component').then((c) => c.UserLayoutComponent),
    canMatch: [userGuard], // ← canMatch بدل canActivate
    children: [
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/userview/userview/userview').then((c) => c.Userview),
        children: [
          { path: 'home', loadComponent: () => import('./features/pages/components/home/home.component').then((c) => c.HomeComponent) },
        ],
      },
      { path: 'booking/:id', loadComponent: () => import('./features/pages/components/booking/booking/booking').then((c) => c.Booking) },
      {
        path: '',
        loadComponent: () => import('./core/layouts/components/userroom/userrooms/userrooms').then((c) => c.Userrooms),
        children: [
          { path: 'roomsearch/:checkOut/:checkIn/:guests', loadComponent: () => import('./features/pages/components/contact/contact.page').then((c) => c.ContactPage) },
          { path: 'rooms', loadComponent: () => import('./features/pages/components/rooms/rooms.page').then((c) => c.RoomsPage) },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

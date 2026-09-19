import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/components/home/home.component';
import { LoginComponents } from './core/auth/login/login.components';
export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'', loadComponent:()=>import ('./core/layouts/components/guest-layout/guest-layout.component').then((c)=>c.GuestLayoutComponent)
        ,children:[
            {path:'login',
                 loadComponent:()=>import ('./core/auth/login/login.components').then((c)=>c.LoginComponents)},
            {path:'signup',
                loadComponent:()=>import ('./core/auth/signup/signup.components').then((c)=>c.SignupComponents)},
            {path:'booking/:id'
                ,loadComponent:()=>import ('./features/pages/components/booking/booking/booking').then((c)=>c.Booking)},
            {path:'guestview'
                ,loadComponent:()=>import ('./core/layouts/components/guestview/guestview').then((c)=>c.Guestview)
                ,children:[
              {path:'home'
                ,loadComponent:()=>import ('./features/pages/components/home/home.component').then((c)=>c.HomeComponent)},
              {path:'rooms'
                ,loadComponent:()=>import ('./features/pages/components/rooms/rooms.page').then((c)=>c.RoomsPage)},
              {path:'roomsearch/:checkOut/:checkIn/:guests'
                ,loadComponent:()=>import ('./features/pages/components/contact/contact.page').then((c)=>c.ContactPage)},
                ]
              },

        ]
     },
    {path:'',
         loadComponent:()=>import ('./core/layouts/components/user-layout/user-layout.component').then((c)=>c.UserLayoutComponent)
        ,children:[
          {path:'home'
                ,loadComponent:()=>import ('./features/pages/components/home/home.component').then((c)=>c.HomeComponent)},
            {path:'rooms'
                ,loadComponent:()=>import ('./features/pages/components/rooms/rooms.page').then((c)=>c.RoomsPage)},
            {path:'booking/:id'
                ,loadComponent:()=>import ('./features/pages/components/booking/booking/booking').then((c)=>c.Booking)},
            {path:'roomsearch/:checkOut/:checkIn/:guests'
                ,loadComponent:()=>import ('./features/pages/components/contact/contact.page').then((c)=>c.ContactPage)},
        ]
     },
     {path:'**',redirectTo:''}
];

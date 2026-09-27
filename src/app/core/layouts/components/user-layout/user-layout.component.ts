import { Component, signal } from '@angular/core';

import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-user-layout',
  imports: [ RouterOutlet,],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  readonly m = signal<boolean>(false);
  onActivate(component: any) {
  if( component.constructor.name==='RoomsPage'){
    this.m.set(true);
  }else{
    this.m.set(false);
  }
}
}

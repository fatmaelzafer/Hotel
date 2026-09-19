import { Component, signal } from '@angular/core';
import { NavbarComponents } from "../../../../shared/components/navbar/navbar.components";
import { RouterOutlet } from "@angular/router";
import { FooterComponents } from "../../../../shared/components/footer/footer.components";

@Component({
  selector: 'app-user-layout',
  imports: [NavbarComponents, RouterOutlet, FooterComponents],
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

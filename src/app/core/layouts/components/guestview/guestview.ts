import { Component, signal, ViewChild } from '@angular/core';
import { NavbarComponents } from "../../../../shared/components/navbar/navbar.components";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { FooterComponents } from "../../../../shared/components/footer/footer.components";
import { filter } from 'rxjs';

@Component({
  selector: 'app-guestview',
  imports: [NavbarComponents, RouterOutlet, FooterComponents],
  templateUrl: './guestview.html',
  styleUrl: './guestview.css',
})
export class Guestview {
 readonly m = signal<boolean>(false);
  onActivate(component: any) {
  if( component.constructor.name==='RoomsPage'){
    this.m.set(true);
  }else{
    this.m.set(false);
  }
}

}

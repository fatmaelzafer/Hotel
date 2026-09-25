import { Component } from '@angular/core';
import { NavbarComponents } from '../../../../../shared/components/navbar/navbar.components';
import { FooterComponents } from '../../../../../shared/components/footer/footer.components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-userrooms',
  imports: [NavbarComponents, FooterComponents, RouterOutlet],
  templateUrl: './userrooms.html',
  styleUrl: './userrooms.css',
})
export class Userrooms {

}

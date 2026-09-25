import { Component } from '@angular/core';
import { NavbarComponents } from '../../../../../shared/components/navbar/navbar.components';
import { FooterComponents } from '../../../../../shared/components/footer/footer.components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-userview',
  imports: [NavbarComponents, FooterComponents, RouterOutlet],
  templateUrl: './userview.html',
  styleUrl: './userview.css',
})
export class Userview {

}

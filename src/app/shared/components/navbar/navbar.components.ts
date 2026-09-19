import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.components.html',
  styleUrl: './navbar.components.css',
})
export class NavbarComponents {
   constructor(private router:Router){}
   @Input({required:true})isuser:boolean=false;
   @Input({required:true})isroom:boolean=false;
   pages=[
 {name:'Home',link:'/home'},
 {name:'Rooms',link:'/rooms' },
 //{name:'Booking',link:'/booking'},

 ]
 signout(){
  localStorage.removeItem('userToken');
  this.router.navigate(['/login']);
 }
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  sign(){
    this.router.navigate(['/signup']);
  }
}

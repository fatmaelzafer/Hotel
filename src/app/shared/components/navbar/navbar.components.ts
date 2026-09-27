import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.components.html',
  styleUrl: './navbar.components.css',
})
export class NavbarComponents {
  private readonly elementRef = inject(ElementRef);

  constructor(private router: Router) {}

  @Input({ required: true }) isuser: boolean = false;
  @Input({ required: true }) isroom: boolean = false;

  pages = [
    { name: 'Home', link: '/home' },
    { name: 'Rooms', link: '/rooms' },
    // {name:'Booking',link:'/booking'},
  ];

  signout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * تقفل القائمة (على الموبايل) لو المستخدم دوس في أي حتة برة الـ navbar.
   * بيشتغل على أي click في الصفحة كلها، وبيتأكد إن مكان الضغط مش جوه
   * الـ navbar نفسها قبل ما يقفلها.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  sign(): void {
    this.router.navigate(['/signup']);
  }
}

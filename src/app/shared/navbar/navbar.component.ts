import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SITE, CONTACT } from '../../data/content';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  site = SITE;
  contact = CONTACT;
  menuOpen = false;
  profileMenuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  links = [
    { path: '/', label: 'Welcome' },
    { path: '/about', label: 'About' },
    { path: '/committee', label: 'Committee' },
    { path: '/events', label: 'Events' },
    { path: '/membership', label: 'Membership' },
    { path: '/student-chapter', label: 'Student Chapter' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
    this.profileMenuOpen = false;
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  get username(): string {
    return this.auth.getUsername();
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeProfileMenuOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav__profile')) {
      this.profileMenuOpen = false;
    }
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
    this.router.navigateByUrl('/');
  }
}

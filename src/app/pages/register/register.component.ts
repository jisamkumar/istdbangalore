import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  mobile = '';
  memberType = 'Student';
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.fullName.trim() || !this.email.trim() || !this.password || !this.confirmPassword || !this.mobile.trim()) {
      this.errorMessage = 'Complete full name, mobile number, email, and password to create your account.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.errorMessage = 'Enter a valid email address.';
      return;
    }

    if (!/^[0-9+()\-\s]{8,15}$/.test(this.mobile.trim())) {
      this.errorMessage = 'Enter a valid mobile number.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.auth.register(this.email.trim(), this.password, this.memberType, this.fullName.trim(), this.mobile.trim()).subscribe({
      next: () => this.router.navigateByUrl('/login?registered=true'),
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}

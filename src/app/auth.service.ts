import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Add additional token validation logic here if needed
    return !!token;
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}

import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    // check token validity
    const data = this.getData();
    if (data.exp < Date.now() / 1000) {
      this.logout();
      return false;
    }

    return true;
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  getData(): any {
    const token = localStorage.getItem('token');
    // Add additional token validation logic here if needed
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }
}

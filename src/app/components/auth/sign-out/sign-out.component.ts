import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  template: '',
})
export class SignOutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socialAuth: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this.socialAuth.signOut();
    this.authService.logout();
  }
}

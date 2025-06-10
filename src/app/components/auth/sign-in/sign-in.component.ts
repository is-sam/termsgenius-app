import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DividerModule } from 'primeng/divider';
import { GoogleService } from '../../../services/google.service';

export interface AuthLoginResponse {
  token: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    // primeng modules
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    GoogleSigninButtonModule,
    DividerModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';

  private isDestroyed$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private socialAuth: SocialAuthService,
    private google: GoogleService,
  ) {}

  ngOnInit(): void {
    this.socialAuth.authState
    .pipe(takeUntil(this.isDestroyed$))
    .subscribe({
      next: (user: SocialUser) => {
        console.log('Google user:', user);
        if (!user) {
          return;
        }

        this.google.signIn(user.idToken).subscribe({
          next: (response: AuthLoginResponse) => {
            console.log('Google auth response:', response);
            this.auth.login(response.token);
          },
          error: (error) => {
            console.log('Error signing in with Google:', error);
          }
        });;
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  signIn(): void {
    console.log('Signing in...', environment.apiEndpoint, this.email, this.password);
    this.http.post<AuthLoginResponse>(`${environment.apiEndpoint}/auth/login`, { email: this.email, password: this.password })
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: (response: AuthLoginResponse) => {
          this.auth.login(response.token);
        },
        error: (error) => {
          console.log('Error signing in:', error);
        }
      });
  }
}

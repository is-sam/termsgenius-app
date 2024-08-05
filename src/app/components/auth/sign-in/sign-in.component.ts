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

interface AuthLoginResponse {
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

  private isDesroyed$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private socialAuth: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this.socialAuth.authState.subscribe({
      next: (user: SocialUser) => {
        console.log('Google user:', user);
        this.googleSignInt(user.idToken);
      }
    });
  }

  ngOnDestroy(): void {
    this.isDesroyed$.next();
    this.isDesroyed$.complete();
  }

  signIn(): void {
    console.log('Signing in...', environment.apiEndpoint, this.email, this.password);
    this.http.post<AuthLoginResponse>(`${environment.apiEndpoint}/auth/login`, { email: this.email, password: this.password })
      .pipe(takeUntil(this.isDesroyed$))
      .subscribe({
        next: (response: AuthLoginResponse) => {
          this.auth.login(response.token);
        },
        error: (error) => {
          console.log('Error signing in:', error);
        }
      });
  }

  googleSignInt(token: string): void {
    console.log('googleSignInt', token);
    this.http.post<AuthLoginResponse>(`${environment.apiEndpoint}/auth/google`, { token })
      .pipe(takeUntil(this.isDesroyed$))
      .subscribe({
        next: (response: AuthLoginResponse) => {
          console.log('Google auth response:', response);
          this.auth.login(response.token);
        },
        error: (error) => {
          console.log('Error signing in with Google:', error);
        }
      });
  }
}

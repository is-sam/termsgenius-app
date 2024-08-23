import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DividerModule } from 'primeng/divider';
import { GoogleService } from '../../../services/google.service';
import { AuthLoginResponse } from '../sign-in/sign-in.component';
import { AuthService } from '../../../auth/auth.service';

interface AuthRegisterResponse {
  error?: string;
  message?: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    DividerModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup = new FormGroup(
    {
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.checkPasswords],
    } as AbstractControlOptions
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private socialAuth: SocialAuthService,
    private google: GoogleService,
  ) {}

  ngOnInit(): void {
    this.socialAuth.authState.subscribe({
      next: (user: SocialUser) => {
        console.log('Google user:', user);
        this.google.signIn(user.idToken).subscribe({
          next: (response: AuthLoginResponse) => {
            console.log('Google auth response:', response);
            this.auth.login(response.token);
          },
          error: (error) => {
            console.log('Error signing up with Google:', error);
          }
        });;
      }
    });
  }

  signUp(): void {
    console.log('Signing up...', this.signupForm.value);

    if (!this.signupForm.valid) {
      console.error('Form is invalid');
      return;
    }

    this.http
      .post<AuthRegisterResponse>(
        `${environment.apiEndpoint}/auth/register`,
        this.signupForm.value
      )
      .subscribe({
        next: (response: AuthRegisterResponse) => {
          if (response.error) {
            console.log('Error signing up with response:', response.error);
            return;
          }

          console.log('Signed up:', response.message);
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          console.log('Error signing up:', error);
        },
      });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('repeatPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get repeatPasswordControl() {
    return this.signupForm.get('repeatPassword');
  }

  get firstnameControl() {
    return this.signupForm.get('firstname');
  }

  get lastnameControl() {
    return this.signupForm.get('lastname');
  }
}

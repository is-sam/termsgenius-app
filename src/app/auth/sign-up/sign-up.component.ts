import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

interface AuthRegisterResponse {
  error?: string;
  message?: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required])
  }, {
    validators: [this.checkPasswords]
  } as AbstractControlOptions);

  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  signUp(): void {
    console.log('Signing up...', this.email, this.password, this.repeatPassword);

    if (!this.signupForm.valid) {
      console.error('Form is invalid');
      return;
    }

    this.http.post<AuthRegisterResponse>(`${environment.apiEndpoint}/api/register`, { email: this.email, password: this.password, repeatPassword: this.repeatPassword })
      .pipe(take(1))
      .subscribe((response: AuthRegisterResponse) => {
        if (response.error) {
          console.error('Error signing up:', response.error);
          return;
        }

        console.log('Signed up:', response.message);
        this.router.navigate(['/sign-in']);
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
}

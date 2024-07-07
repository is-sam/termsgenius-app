import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { take } from 'rxjs';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  signIn(): void {
    console.log('Signing in...', environment.apiEndpoint, this.email, this.password);
    this.http.post<AuthLoginResponse>(`${environment.apiEndpoint}/auth/login`, { username: this.email, password: this.password })
      .pipe(take(1))
      .subscribe((response: AuthLoginResponse) => {
        this.authService.login(response.token);
      });
  }
}

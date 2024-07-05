import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs';

interface AuthRegisterResponse {
  error?: string;
  message?: string;
}


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(): void {
    console.log('Signing up...', this.email, this.password, this.repeatPassword);
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
}

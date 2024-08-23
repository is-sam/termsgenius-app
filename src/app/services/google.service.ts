import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoginResponse } from '../components/auth/sign-in/sign-in.component';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  signIn(token: string): Observable<AuthLoginResponse> {
    console.log('googleSignInt', token);
    return this.http.post<AuthLoginResponse>(`${environment.apiEndpoint}/auth/google`, { token })
  }
}

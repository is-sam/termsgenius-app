import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, repeat, Subject } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  data$: Subject<User> = new Subject<User>;

  constructor(private http: HttpClient) { }

  loadData() {
    this.getData().subscribe(data => {
      this.data$.next(data);
    });
  }

  getData(): Observable<User> {
    return this.http.get<User>(`${environment.apiEndpoint}/api/profile/data`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiEndpoint}/api/profile/data`, user);
  }

  changePassword(password: string, repeatPassword: string): Observable<User> {
    return this.http.put<User>(`${environment.apiEndpoint}/api/profile/password`, { password, repeatPassword });
  }
}

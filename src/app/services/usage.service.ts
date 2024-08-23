import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Usage {
  projects: number;
  messages: number;
  detail: {
    id: number;
    count: number;
  }|null;
}

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  usage: BehaviorSubject<Usage> = new BehaviorSubject<Usage>({
    projects: 0,
    messages: 0,
    detail: null
  });

  constructor(private http: HttpClient) { }

  checkUsage(): Observable<Usage> {
    return this.http.get<Usage>(`${environment.apiEndpoint}/api/usage/check`).pipe(
      tap(usage => this.usage.next(usage)),
    );
  }
}

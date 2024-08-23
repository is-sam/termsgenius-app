import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface DashboardData {
  documents: number;
  questions: number;
  lines: number;
  timesaved: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  data$: BehaviorSubject<DashboardData|null> = new BehaviorSubject<DashboardData|null>(null);

  constructor(private http: HttpClient) { }

  loadData() {
    this.getData().subscribe((data: DashboardData) => {
      this.data$.next(data);
    });
  }

  getData() {
    return this.http.get<DashboardData>(`${environment.apiEndpoint}/api/dashboard`);
  }
}

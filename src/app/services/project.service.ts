import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/project';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects$: BehaviorSubject<Array<Project>> = new BehaviorSubject<Array<Project>>([]);
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  loadProjects() {
    this.getProjects()
    .pipe(tap(() => this.loading = true))
    .subscribe((projects) => {
      console.log('projects', projects);
      this.projects$.next(projects);
      this.loading = false;
    });
  }

  getProjects(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(`${environment.apiEndpoint}/api/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.apiEndpoint}/api/projects/${id}`);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.apiEndpoint}/api/projects`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${environment.apiEndpoint}/api/projects/${project.id}`, project);
  }

  deleteProject(project: Project): Observable<void> {
    return this.http.delete<void>(`${environment.apiEndpoint}/api/projects/${project.id}`);
  }

  getMessages(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiEndpoint}/api/projects/${id}/messages`);
  }

  addMessage(id: number, message: string): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/api/projects/${id}/messages`, { text: message });
  }
}

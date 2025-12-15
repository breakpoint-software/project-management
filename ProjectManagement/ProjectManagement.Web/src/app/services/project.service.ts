import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    throw new Error('complete implementation');
  }

  getProjectById(id: number): Observable<Project> {
    throw new Error('complete implementation');
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    throw new Error('complete implementation');
  }

  deleteProject(id: number): Observable<void> {
    throw new Error('complete implementation');
  }
}

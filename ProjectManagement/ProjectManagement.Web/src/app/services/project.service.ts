import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { BaseApiService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export default class ProjectService extends BaseApiService {

  constructor(protected override http: HttpClient)   {
    super(http, "https://localhost:7143/api/projects");
   }

  getProjects() : Observable<Project[]> {
     return this.get<Project[]>("");
  }

  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.post<Project>("", project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.put<Project>(`/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.delete<void>(`/${id}`);
  }
}

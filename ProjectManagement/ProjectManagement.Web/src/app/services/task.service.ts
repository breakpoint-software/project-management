import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectTask } from '../models/project-task.model';
import { BaseApiService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseApiService {
  private apiUrl = '';

  constructor(protected override http: HttpClient) {
    super(http, 'https://localhost:7143/api/tasks');
   }

  getTasks(): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>("").pipe(
      catchError(error => {
        console.error('Error fetching tasks', error);
        throw error;
      })
    );
  }

  getTasksByProjectId(projectId: number): Observable<ProjectTask[]> {
    return this.get<ProjectTask[]>(`?projectId=${projectId}`);
  }

  getTaskById(id: number): Observable<ProjectTask> {
    return this.get<ProjectTask>(`/${id}`);
  }


  createTask(task: ProjectTask): Observable<ProjectTask> {
    return this.post<ProjectTask>("", task);
  }

  updateTask(id: number, task: ProjectTask): Observable<ProjectTask> {
    return this.put<ProjectTask>(`/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.delete <void>(`/${id}`);
  }
}

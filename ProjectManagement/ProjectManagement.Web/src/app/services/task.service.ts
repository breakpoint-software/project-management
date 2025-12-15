import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectTask } from '../models/project-task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching tasks', error);
        throw error;
      })
    );
  }

  getTasksByProjectId(projectId: number): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(`${this.apiUrl}?projectId=${projectId}`).pipe(
      catchError(error => {
        console.error('Error fetching tasks for project', error);
        throw error;
      })
    );
  }

  getTaskById(id: number): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching task', error);
        throw error;
      })
    );
  }


  createTask(task: ProjectTask): Observable<ProjectTask> {
    console.log('Creating task:', task);
    throw new Error('complete implementation');
  }

  updateTask(id: number, task: ProjectTask): Observable<ProjectTask> {
    console.log('Updating task:', id, task);
    throw new Error('complete implementation');
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting task', error);
        throw error;
      })
    );
  }
}

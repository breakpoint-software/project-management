import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { ProjectTask } from '../../models/project-task.model';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project | null = null;
  tasks: ProjectTask[] = [];
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProject(id);
      this.loadTasks(id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProject(id: number): void {
    this.loading = true;
    this.error = null;

    this.projectService.getProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project) => {
          this.project = project;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load project';
          this.loading = false;
          console.error('Error loading project:', error);
        }
      });
  }

  loadTasks(projectId: number): void {
    this.taskService.getTasksByProjectId(projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
        }
      });
  }

  refreshTasks(): void {
    if (this.project) {
      this.taskService.getTasksByProjectId(this.project.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (tasks) => {
            this.tasks = tasks;
          },
          error: (error) => {
            console.error('Error loading tasks:', error);
          }
        });
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.refreshTasks();
          },
          error: (error) => {
            this.error = 'Failed to delete task';
            console.error('Error deleting task:', error);
          }
        });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'NotStarted':
      case 'Todo':
        return 'badge bg-secondary';
      case 'InProgress':
        return 'badge bg-primary';
      case 'Completed':
      case 'Done':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { ProjectTask } from '../../models/project-task.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  statuses = ['Todo', 'InProgress', 'Done'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: ['Todo', Validators.required],
      projectId: [0, [Validators.required, Validators.min(1)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const projectId = this.route.snapshot.queryParamMap.get('projectId');

    if (projectId) {
      this.taskForm.patchValue({ projectId: Number(projectId) });
    }

    if (id) {
      this.isEditMode = true;
      this.taskId = Number(id);
      this.loadTask(this.taskId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTask(id: number): void {
    this.loading = true;
    this.taskService.getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
            projectId: task.projectId,
            dueDate: new Date(task.dueDate).toISOString().split('T')[0]
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load task';
          this.loading = false;
          console.error('Error loading task:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.loading = true;
      this.error = null;

      const taskData: ProjectTask = {
        id: this.taskId || 0,
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate)
      };

      const operation = this.isEditMode
        ? this.taskService.updateTask(this.taskId!, taskData)
        : this.taskService.createTask(taskData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/projects', taskData.projectId]);
        }
      });
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  cancel(): void {
    const projectId = this.taskForm.value.projectId;
    if (projectId) {
      this.router.navigate(['/projects', projectId]);
    } else {
      this.router.navigate(['/projects']);
    }
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get status() { return this.taskForm.get('status'); }
  get projectId() { return this.taskForm.get('projectId'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
}

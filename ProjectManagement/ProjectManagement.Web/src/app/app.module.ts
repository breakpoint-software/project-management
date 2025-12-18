import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

import ProjectService from './services/project.service';
import { TaskService } from './services/task.service';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProjectService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjects', 'deleteProject']);

    await TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
  });

  // FAILING TEST: This test checks for the memory leak issue
  it('should unsubscribe from observables on destroy to prevent memory leaks', () => {
    const mockProjects: Project[] = [
      { id: 1, name: 'Project 1', description: 'Test', status: 'InProgress' }
    ];

    projectService.getProjects.and.returnValue(of(mockProjects));

    // Create the component
    fixture.detectChanges();

    component.ngOnInit();

    // Check if component has a mechanism to unsubscribe
    // This will FAIL because there's no ngOnDestroy or subscription management
    expect((component as any).destroy$).toBeDefined(); // This will FAIL

    // Check if ngOnDestroy method exists
    expect(typeof component.ngOnDestroy).toBe('function'); // This will FAIL - method doesn't exist

    // This test demonstrates the memory leak issue - subscriptions are never cleaned up
  });

  it('should load projects on init', () => {
    const mockProjects: Project[] = [
      { id: 1, name: 'Project 1', description: 'Test', status: 'InProgress' }
    ];

    projectService.getProjects.and.returnValue(of(mockProjects));
    fixture.detectChanges();

    expect(component.projects.length).toBe(1);
    expect(projectService.getProjects).toHaveBeenCalled();
  });
});

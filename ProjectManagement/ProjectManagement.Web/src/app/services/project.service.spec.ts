import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle errors when creating a project', () => {
    const newProject: Project = {
      id: 1,
      name: 'Test Project',
      description: 'Test Description',
      status: 'NotStarted'
    };

    let errorResponse: any;

    service.createProject(newProject).subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        errorResponse = error;
        expect(errorResponse.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('http://localhost:5000/api/projects');
    expect(req.request.method).toBe('POST');

    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should get projects successfully', () => {
    const mockProjects: Project[] = [
      { id: 1, name: 'Project 1', description: 'Desc 1', status: 'InProgress' }
    ];

    service.getProjects().subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });
});

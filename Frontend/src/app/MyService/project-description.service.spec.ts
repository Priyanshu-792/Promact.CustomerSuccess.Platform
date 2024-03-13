import { TestBed } from '@angular/core/testing';

import { ProjectDescriptionService } from './project-description.service';

describe('ProjectDescriptionService', () => {
  let service: ProjectDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

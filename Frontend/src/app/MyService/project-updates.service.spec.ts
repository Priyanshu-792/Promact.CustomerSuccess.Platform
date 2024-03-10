import { TestBed } from '@angular/core/testing';

import { ProjectUpdatesService } from './project-updates.service';

describe('ProjectUpdatesService', () => {
  let service: ProjectUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

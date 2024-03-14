import { TestBed } from '@angular/core/testing';

import { PhaseMilestoneService } from './phase-milestone.service';

describe('PhaseMilestoneService', () => {
  let service: PhaseMilestoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseMilestoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApprovedTeamService } from './approved-team.service';

describe('ApprovedTeamService', () => {
  let service: ApprovedTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

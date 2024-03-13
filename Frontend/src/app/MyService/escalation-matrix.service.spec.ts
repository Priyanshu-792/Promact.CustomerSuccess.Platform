import { TestBed } from '@angular/core/testing';

import { EscalationMatrixService } from './escalation-matrix.service';

describe('EscalationMatrixService', () => {
  let service: EscalationMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalationMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuditHistoryService } from './audit-history.service';

describe('AuditHistoryService', () => {
  let service: AuditHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

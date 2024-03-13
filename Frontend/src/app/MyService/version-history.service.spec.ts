import { TestBed } from '@angular/core/testing';

import { VersionHistoryService } from './version-history.service';

describe('VersionHistoryService', () => {
  let service: VersionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StakeHoldersService } from './stake-holders.service';

describe('StakeHoldersService', () => {
  let service: StakeHoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeHoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

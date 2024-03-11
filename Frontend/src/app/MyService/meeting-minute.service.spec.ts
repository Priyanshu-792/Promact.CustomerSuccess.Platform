import { TestBed } from '@angular/core/testing';

import { MeetingMinuteService } from './meeting-minute.service';

describe('MeetingMinuteService', () => {
  let service: MeetingMinuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingMinuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

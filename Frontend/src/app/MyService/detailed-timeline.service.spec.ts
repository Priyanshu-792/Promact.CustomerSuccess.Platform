import { TestBed } from '@angular/core/testing';

import { DetailedTimelineService } from './detailed-timeline.service';

describe('DetailedTimelineService', () => {
  let service: DetailedTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ClientFeedbackService } from './client-feedback.service';

describe('ClientFeedbackService', () => {
  let service: ClientFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

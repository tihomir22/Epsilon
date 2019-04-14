import { TestBed } from '@angular/core/testing';

import { MailingService } from './mailing.service';

describe('MailingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailingService = TestBed.get(MailingService);
    expect(service).toBeTruthy();
  });
});

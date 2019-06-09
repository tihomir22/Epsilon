import { TestBed } from '@angular/core/testing';

import { MensajeschatService } from './mensajeschat.service';

describe('MensajeschatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajeschatService = TestBed.get(MensajeschatService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TechnicalIndicatorsService } from './technical-indicators.service';

describe('TechnicalIndicatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnicalIndicatorsService = TestBed.get(TechnicalIndicatorsService);
    expect(service).toBeTruthy();
  });
});

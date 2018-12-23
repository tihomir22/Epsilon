import { TestBed } from '@angular/core/testing';

import { ServiceLoginDashboardService } from './service-login-dashboard.service';

describe('ServiceLoginDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceLoginDashboardService = TestBed.get(ServiceLoginDashboardService);
    expect(service).toBeTruthy();
  });
});

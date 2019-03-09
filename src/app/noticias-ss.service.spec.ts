import { TestBed } from '@angular/core/testing';

import { NoticiasSSService } from './noticias-ss.service';

describe('NoticiasSSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticiasSSService = TestBed.get(NoticiasSSService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MainpageService } from './mainpage.service';

describe('MainpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainpageService = TestBed.get(MainpageService);
    expect(service).toBeTruthy();
  });
});

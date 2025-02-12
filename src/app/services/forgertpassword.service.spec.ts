import { TestBed } from '@angular/core/testing';

import { ForgertpasswordService } from './forgertpassword.service';

describe('ForgertpasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgertpasswordService = TestBed.get(ForgertpasswordService);
    expect(service).toBeTruthy();
  });
});

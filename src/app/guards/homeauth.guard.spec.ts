import { TestBed, async, inject } from '@angular/core/testing';

import { HomeauthGuard } from './homeauth.guard';

describe('HomeauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeauthGuard]
    });
  });

  it('should ...', inject([HomeauthGuard], (guard: HomeauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

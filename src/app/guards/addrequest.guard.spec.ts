import { TestBed, async, inject } from '@angular/core/testing';

import { AddrequestGuard } from './addrequest.guard';

describe('AddrequestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddrequestGuard]
    });
  });

  it('should ...', inject([AddrequestGuard], (guard: AddrequestGuard) => {
    expect(guard).toBeTruthy();
  }));
});

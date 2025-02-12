import { TestBed } from '@angular/core/testing';

import { AddrequestService } from './addrequest.service';

describe('AddrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddrequestService = TestBed.get(AddrequestService);
    expect(service).toBeTruthy();
  });
});

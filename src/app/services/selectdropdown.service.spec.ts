import { TestBed } from '@angular/core/testing';

import { SelectdropdownService } from './selectdropdown.service';

describe('SelectdropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectdropdownService = TestBed.get(SelectdropdownService);
    expect(service).toBeTruthy();
  });
});

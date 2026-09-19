import { TestBed } from '@angular/core/testing';

import { Roomsearch } from './roomsearch';

describe('Roomsearch', () => {
  let service: Roomsearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Roomsearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

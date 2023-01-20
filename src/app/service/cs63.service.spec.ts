import { TestBed } from '@angular/core/testing';

import { Cs63Service } from './cs63.service';

describe('Cs63Service', () => {
  let service: Cs63Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cs63Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

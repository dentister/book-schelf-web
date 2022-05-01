import { TestBed } from '@angular/core/testing';

import { BookSchelfService } from './book-schelf.service';

describe('BookSchelfService', () => {
  let service: BookSchelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSchelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

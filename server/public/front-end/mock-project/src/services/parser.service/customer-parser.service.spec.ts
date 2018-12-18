import { TestBed } from '@angular/core/testing';

import { CustomerParserService } from './customer-parser.service';

describe('CustomerParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerParserService = TestBed.get(CustomerParserService);
    expect(service).toBeTruthy();
  });
});

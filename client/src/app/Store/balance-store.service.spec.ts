import { TestBed } from '@angular/core/testing';

import { BalanceStoreService } from './balance-store.service';

describe('BalanceStoreService', () => {
  let service: BalanceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

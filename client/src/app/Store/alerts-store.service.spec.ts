import { TestBed } from '@angular/core/testing';

import { AlertsStoreService } from './alerts-store.service';

describe('AlertsStoreService', () => {
  let service: AlertsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

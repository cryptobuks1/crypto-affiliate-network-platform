import { TestBed } from '@angular/core/testing';

import { VantaService } from './vanta.service';

describe('VantaService', () => {
  let service: VantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

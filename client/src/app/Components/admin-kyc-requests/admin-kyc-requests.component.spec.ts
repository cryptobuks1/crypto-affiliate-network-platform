import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycRequestsComponent } from './admin-kyc-requests.component';

describe('AdminKycRequestsComponent', () => {
  let component: AdminKycRequestsComponent;
  let fixture: ComponentFixture<AdminKycRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKycRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentRequestsComponent } from './admin-payment-requests.component';

describe('AdminPaymentRequestsComponent', () => {
  let component: AdminPaymentRequestsComponent;
  let fixture: ComponentFixture<AdminPaymentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWithdrawalsComponent } from './admin-withdrawals.component';

describe('AdminWithdrawalsComponent', () => {
  let component: AdminWithdrawalsComponent;
  let fixture: ComponentFixture<AdminWithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWithdrawalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

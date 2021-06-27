import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPaymentsComponent } from './setup-payments.component';

describe('SetupPaymentsComponent', () => {
  let component: SetupPaymentsComponent;
  let fixture: ComponentFixture<SetupPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

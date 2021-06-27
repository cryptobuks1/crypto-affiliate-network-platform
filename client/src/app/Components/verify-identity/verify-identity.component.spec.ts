import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdentityComponent } from './verify-identity.component';

describe('VerifyIdentityComponent', () => {
  let component: VerifyIdentityComponent;
  let fixture: ComponentFixture<VerifyIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

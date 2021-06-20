import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimBuyComponent } from './claim-buy.component';

describe('ClaimBuyComponent', () => {
  let component: ClaimBuyComponent;
  let fixture: ComponentFixture<ClaimBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

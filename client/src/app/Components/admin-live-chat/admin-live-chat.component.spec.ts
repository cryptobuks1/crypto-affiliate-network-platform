import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLiveChatComponent } from './admin-live-chat.component';

describe('AdminLiveChatComponent', () => {
  let component: AdminLiveChatComponent;
  let fixture: ComponentFixture<AdminLiveChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLiveChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteChatComponent } from './dialog-confirm-delete-chat.component';

describe('DialogConfirmDeleteChatComponent', () => {
  let component: DialogConfirmDeleteChatComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmDeleteChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmDeleteChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

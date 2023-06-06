import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThreadMessagesComponent } from './dialog-thread-messages.component';

describe('DialogThreadMessagesComponent', () => {
  let component: DialogThreadMessagesComponent;
  let fixture: ComponentFixture<DialogThreadMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThreadMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogThreadMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

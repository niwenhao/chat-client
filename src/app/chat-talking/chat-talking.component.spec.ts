import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTalkingComponent } from './chat-talking.component';

describe('ChatTalkingComponent', () => {
  let component: ChatTalkingComponent;
  let fixture: ComponentFixture<ChatTalkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTalkingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatTalkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

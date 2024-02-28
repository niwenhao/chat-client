import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatSession, TalkingHistory } from '../chat-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-talking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './chat-talking.component.html',
  styleUrl: './chat-talking.component.scss'
})
export class ChatTalkingComponent {
  //@Input() chatSession = undefined as ChatSession | undefined;

  talkingHistories: TalkingHistory[] = [];
  inputText: string = "";
  role: string = "user";

  session: ChatSession | undefined;

  @Input() set chatSession(session: ChatSession | undefined) {
    console.log("ChatTalkingComponent.set chatSession");
    this.session = session;
    this.updateTalkingHistories();
  }

  updateTalkingHistories() {
    console.log("ChatTalkingComponent.updateTalkingHistories");
    this.session?.listTalkingHistories().then(histories => {
      this.talkingHistories = histories;
    });
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("ChatTalkingComponent.ngOnChanges");
  //   if (changes['chatSession']) {
  //       this.chatSession?.listTalkingHistories().then(histories => {
  //         this.talkingHistories = histories;
  //       });
  //   }
  // }

  sendText() {
    console.log("ChatTalkingComponent.sendText");
    if (this.chatSession) {
      this.chatSession?.addTalkingHistory(this.role, this.inputText).then(() => {
        this.chatSession?.listTalkingHistories().then(histories => {
          this.talkingHistories = histories;
        });
      });
    }
  }
}

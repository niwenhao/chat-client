import { Component, Input, OnInit } from '@angular/core';
import { ChatSession, TalkingHistory } from '../chat-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-talking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './chat-talking.component.html',
  styleUrl: './chat-talking.component.scss'
})
export class ChatTalkingComponent implements OnInit {
  @Input() session: ChatSession | undefined;

  talkingHistories: TalkingHistory[] = [];

  inputText: string = "";

  role: string = "user";

  async ngOnInit() {
    if (this.session) {
      this.talkingHistories = await this.session.listTalkingHistories();
    }
  }

  sendText() {
    if (this.session) {
      this.session.addTalkingHistory("user", this.inputText).then(
        () => {
          this.session!.listTalkingHistories().then(histories => {
            this.talkingHistories = histories;
          });
        }
      );
    }
  }
}

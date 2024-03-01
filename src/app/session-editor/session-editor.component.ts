import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ChatSession, ChatSessionService } from '../chat-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './session-editor.component.html',
  styleUrl: './session-editor.component.scss'
})
export class SessionEditorComponent {

  session: ChatSession | undefined;
  name: string = "";
  model: string = "";

  chatSessionService = Inject(ChatSessionService);

  @Input() set selectedSession(session: ChatSession | undefined) {
    this.session = session;
    this.name = session?.name || "";
    this.model = session ? "model" : "gpt-3.5-turbo";
  }

  @Output() sessionSaved: EventEmitter<any> = new EventEmitter<any>();

  saveSession() {
    if (this.name.length > 4) {
      if (this.session) {
        this.chatSessionService.updateSession(this.session.userId, this.session.id, this.model, this.name).then(
          () => {
            this.sessionSaved.emit();
          }
        );
      } else {
        this.chatSessionService.createSession(this.session!.userId, this.model, this.name).then(
          () => {
            this.sessionSaved.emit();
          }
        );
      }
      this.session = undefined;
      this.model = "gpt-3.5-turbo";
      this.name = "";
    }
  }

  deleteSession() {
    if (this.session) {
      this.chatSessionService.deleteSession(this.session.userId, this.session.id).then(
        () => {
          this.sessionSaved.emit();
        }
      );
      this.session = undefined;
      this.model = "gpt-3.5-turbo";
      this.name = "";
    }
  }
}

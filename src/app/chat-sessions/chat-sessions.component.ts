import { Component, EventEmitter, Output, inject, OnInit, Input } from '@angular/core';
import { ChatSession, ChatSessionService } from '../chat-session.service';
import { CommonModule } from '@angular/common';
import { SessionEditorComponent } from '../session-editor/session-editor.component';

@Component({
  selector: 'chat-sessions',
  standalone: true,
  imports: [CommonModule, SessionEditorComponent],
  templateUrl: './chat-sessions.component.html',
  styleUrl: './chat-sessions.component.scss'
})
export class ChatSessionsComponent implements OnInit {
  @Output() sessionSelected = new EventEmitter();

  @Input() userId: string | undefined;

  chatSessionService = inject(ChatSessionService);

  sessions: ChatSession[] = [];

  ngOnInit() {
    console.log("ChatSessionsComponent.ngOnInit");
    this.chatSessionService.listSessions(this.userId!).then(sessions => {
      this.sessions = sessions;
    });
  }

  saveChatSession(sessionName: string) {
    this.chatSessionService.createSession(this.userId!, sessionName).then(
      (session) => {
        this.sessionSelected.emit(session);
        this.chatSessionService.listSessions(this.userId!).then(sessions => {
          this.sessions = sessions;
        });
      }
    );
  }

  chatSessionSelected(session: ChatSession) {
    console.log("chat-sessions.chatSessionSelected: ", session);
    this.sessionSelected.emit(session);
  }

}

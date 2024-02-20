import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ChatSession, ChatSessionService } from '../chat-session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-sessions.component.html',
  styleUrl: './chat-sessions.component.scss'
})
export class ChatSessionsComponent {
  @Output() sessionSelected = new EventEmitter();

  chatSessionService = inject(ChatSessionService);

  sessions: ChatSession[] = [];

  async ngOnInit() {
    this.sessions = await this.chatSessionService.listSessions();
  }

  newChatSession() {
    this.chatSessionService.createSession(prompt.toString(), "newSession").then(
      (session) => {
        this.sessionSelected.emit(session);
        this.chatSessionService.listSessions().then(sessions => {
          this.sessions = sessions;
        });
      }
    );
  }

  chatSessionSelected(session: ChatSession) {
    this.sessionSelected.emit(session);
  }

}

import { Component } from '@angular/core';
import { ChatSessionsComponent } from '../chat-sessions/chat-sessions.component';
import { ChatTalkingComponent } from '../chat-talking/chat-talking.component';
import { ChatSession } from '../chat-session.service';

@Component({
  selector: 'app-chat-client',
  standalone: true,
  imports: [ ChatSessionsComponent, ChatTalkingComponent],
  templateUrl: './chat-client.component.html',
  styleUrl: './chat-client.component.scss'
})
export class ChatClientComponent {
    session: ChatSession | undefined;

    sessionSelected(session: ChatSession) {
        console.log("sessionSelected: ", session);
        this.session = session;
    }
}

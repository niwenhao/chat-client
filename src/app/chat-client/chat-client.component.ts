import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ChatSessionsComponent } from '../chat-sessions/chat-sessions.component';
import { ChatTalkingComponent } from '../chat-talking/chat-talking.component';
import { ChatSession } from '../chat-session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-client',
  standalone: true,
  imports: [ ChatSessionsComponent, ChatTalkingComponent],
  templateUrl: './chat-client.component.html',
  styleUrl: './chat-client.component.scss'
})
export class ChatClientComponent implements OnInit {
    session = undefined as ChatSession | undefined;

    router = inject(ActivatedRoute);

    userId: string | undefined;

    // receive userId parameter from the route
    ngOnInit(): void {
        console.log("ChatClientComponent.ngOnInit");
        this.router.params.subscribe(params => {
          this.userId = params['userId'];
        });
    }

    sessionSelected(session: ChatSession):void {
        console.log("this : ", this);
        console.log("sessionSelected: ", session);
        this.session = new ChatSession(session.id, session.userId, session.name);
    }
}

import { Inject, Injectable } from '@angular/core';
import { UserLogonService } from './user-logon.service';

@Injectable({
  providedIn: 'root'
})
export class ChatSessionService {
  constructor() { }

  async listSessions(userId: string): Promise<ChatSession[]> {
    const response = await fetch('/service/users/' + userId + '/sessions');
    
    if (response.ok) {
      const sessions = await response.json();
      return sessions.map((s: any) => new ChatSession(s.id, userId, s.name));
    } else {
      throw new Error('Failed to list sessions');
    }
  }

  async createSession(userId: string, name: string): Promise<ChatSession> {
    const response = await fetch('/service/users/' + userId + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    });
    if (response.ok) {
      const session = await response.json();

      return new ChatSession(session.id, userId, session.name);
    } else {
      throw new Error('Failed to create session');
    }
  }
}


export class ChatSession {
  constructor(public id: number, public userId: string, public name: string) { }

  async listTalkingHistories(): Promise<TalkingHistory[]> {
    const response = await fetch('/service/users/' + this.userId + '/sessions/' + this.id + '/talking_histories');
    if (response.ok) {
      const talkingHistories = await response.json();
      return talkingHistories.map((t: any) => new TalkingHistory(t.id, t.role, t.text, t.timestamp));
    } else {
      throw new Error('Failed to list talking histories');
    }
  }

  async addTalkingHistory(role: string, text: string) {
  }
}

export class TalkingHistory {
  constructor(public id: number, public role: string, public text: string, public timestamp: string) { }
}
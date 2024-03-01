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
      return sessions.map((s: any) => new ChatSession(s.id, userId, s.model, s.name));
    } else {
      throw new Error('Failed to list sessions');
    }
  }

  async createSession(userId: string, model: string, name: string): Promise<ChatSession> {
    const response = await fetch('/service/users/' + userId + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({model: model, name: name})
    });
    if (response.ok) {
      const session = await response.json();

      return new ChatSession(session.id, userId, session.model, session.name);
    } else {
      throw new Error('Failed to create session');
    }
  }

  async updateSession(userId: string, sessionId: number, model: string, name: string): Promise<ChatSession> {
    const response = await fetch(`/service/users/${userId}/sessions/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: model, name: name })
    });
    if (response.ok) {
      const session = await response.json();
      return new ChatSession(session.id, userId, session.model, session.name);
    } else {
      throw new Error('Failed to update session');
    }
  }

  async deleteSession(userId: string, sessionId: number): Promise<void> {
    const response = await fetch(`/service/users/${userId}/sessions/${sessionId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete session');
    }
  }
}


export class ChatSession {
  constructor(public id: number, public userId: string, public model: string, public name: string) { }

  async listTalkingHistories(): Promise<TalkingHistory[]> {
    const response = await fetch('/service/users/' + this.userId + '/sessions/' + this.id + '/talking_histories');
    if (response.ok) {
      const talkingHistories = await response.json();
      return talkingHistories.map((t: any) => new TalkingHistory(t.id, t.role, t.message, t.timestamp));
    } else {
      throw new Error('Failed to list talking histories');
    }
  }

  async addTalkingHistory(role: string, text: string): Promise<TalkingHistory[]> {
    const response = await fetch(`/service/users/${this.userId}/sessions/${this.id}/talking_histories/${this.model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: role, message: text })
    });

    if (response.ok) {
      const talkingHistories = await response.json();
      return talkingHistories.map((t: any) => new TalkingHistory(t.id, t.role, t.message, t.timestamp));
    } else {
      throw new Error('Failed to add talking history');
    }
  }
}

export class TalkingHistory {
  constructor(public id: number, public role: string, public text: string, public timestamp: string) { }
}
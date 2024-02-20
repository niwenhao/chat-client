import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatSessionService {

  constructor() { }

  async listSessions(): Promise<ChatSession[]> {
    return [];
  }

  async createSession(prompt: string, name: string): Promise<ChatSession> {
    return new ChatSession(0, name, prompt);
  }
}


export class ChatSession {
  constructor(public id: number, public name: string, public prompt: string) { }

  async listTalkingHistories(): Promise<TalkingHistory[]> {
    return [];
  }

  async addTalkingHistory(role: string, text: string) {
  }
}

export class TalkingHistory {
  constructor(public id: number, public role: string, public text: string) { }
}
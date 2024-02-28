import { Injectable } from '@angular/core';

export class LogonUser {
  public user_id: number = 0;
  public user_name: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class UserLogonService {

  constructor() { }

  async logon(name: string, password: string): Promise<LogonUser> {
    const response = await fetch('/service/logon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, password: password})
    });

    if (response.ok) {
      const user = await response.json();
      return {
        user_id: user.id,
        user_name: user.name
      };
    } else {
      throw new Error('Logon failed');
    } 
  }
}

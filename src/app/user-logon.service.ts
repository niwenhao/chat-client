import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogonService {

  constructor() { }

  logonUser: string = '';

  getLogonUser(): string {
    return this.logonUser;
  }

  logon(user_id: string, password: string): boolean {
    if (user_id === 'user' && password === 'password') {
      this.logonUser = user_id;
      return true;
    } else {
      return false;
    }
  }
}

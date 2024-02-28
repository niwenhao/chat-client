import { Routes } from '@angular/router';
import { LogonComponent } from './logon/logon.component';
import { ChatClientComponent } from './chat-client/chat-client.component';

export const routes: Routes = [
    {path: '', component: LogonComponent },
    {path: 'chat/:userId', component: ChatClientComponent}
];

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLogonService } from '../user-logon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  template: `
    <div>{{errorMessage}}</div>
    <form [formGroup]="loginInput" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="user_id">User ID:</label>
        <input type="text" id="user_id" formControlName="user_id" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password" required>
      </div>

      <button type="submit">Logon</button>
    </form>  `,
  styleUrl: './logon.component.scss'
})
export class LogonComponent {
  userLoginService = inject(UserLogonService)

  router = inject(Router)

  errorMessage = ""

  loginInput: FormGroup =  new FormGroup({
      user_id: new FormControl(),
      password: new FormControl()
    });

    constructor() { }

  async onSubmit() {
    const logonResult = await this.userLoginService.logon(this.loginInput.value.user_id, this.loginInput.value.password);
    if (logonResult) {
      this.router.navigate(['/chat', logonResult.user_id]);
    } else {
      this.errorMessage = "Logon failed";
    } 
  }
}

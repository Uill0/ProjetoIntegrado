import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email : string = "";

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {

  }

  forgotpassword() {
     this.auth.forgotPassword(this.email);
     this.email = '';
  }
}

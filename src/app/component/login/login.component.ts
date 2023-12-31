import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email : string = '';
  password : string = '';
  
  constructor(private auth : AuthService, private router : Router){}
  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/register'])
  }

  forgotpassword(){
    this.router.navigate(['/forgot-password'])
  }
 
 login() {
  if(this.email == '') {
    alert('Por favor insira seu email');
    return;
  }

  if(this.password == '') {
    alert('Por favor insira sua senha');
    return;
  }

  this.auth.login(this.email, this.password);

  this.email = '';
  this.password = '';
 }

}

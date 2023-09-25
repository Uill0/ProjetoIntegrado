import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  email : string = '';
  password : string = '';
  confirmPassword : string = '';
  user : string = '';
  name : string = '';

  constructor(private auth : AuthService, private router : Router) {}

  ngOnInit(): void {

  }
  login() {
    this.router.navigate(['/login']);
}

  register() {
    if(this.email == '') {
      alert('Por favor insira seu email');
      return;
    }
  
    if(this.password == '') {
      alert('Por favor insira sua senha');
      return;
    }

    if(this.password !== this.confirmPassword) {
      alert('Senhas diferentes');
      return;
    }

    if(this.user == '') {
      alert('Insira um nome de usuário');
      return;
    }

    if(this.name == '') {
      alert('Insira seu nome');
      return;
    }
  
    this.auth.register(this.email, this.password, this.user, this.name);
  
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.user = '';
    this.name = '';
   }
}

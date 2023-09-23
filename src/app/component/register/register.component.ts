import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';


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

  constructor(private auth : AuthService) {}

  ngOnInit(): void {

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
  
    this.auth.register(this.email, this.password, this.user);
  
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.user = '';
   }
}

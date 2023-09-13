import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireauth : AngularFireAuth, private router : Router) { }
  
  // metodo de login
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( res => { 
      localStorage.setItem('token', 'true');

      if(res.user?.emailVerified == true) {
        this.router.navigate(['/home']); 
      } else {
        this.router.navigate(['/varify-email']);
      }

    }, err => {
      alert('Algo está errado');
      this.router.navigate(['/login']);
    })
  } 
  
  //metodo de cadastro
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Cadastro efetuado com sucesso');
      this.router.navigate(['/login']);
      this.sendEmailVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sair
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
  
  // recupertar senha 
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Algo está errado');
    })
    }

  // verificação de email
  sendEmailVerification(user : any) {
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Algo está errado. Não cosnigo enviar o email de confirmação.')
    })
  }
  }




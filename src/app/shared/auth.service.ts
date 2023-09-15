import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSuccess: boolean | undefined;
  angularFireAuth: any;

  constructor( private fireauth : AngularFireAuth, private router : Router) { }

  
  isLoggedIn(): boolean {
    const isUserAuthenticated = !!this.fireauth.currentUser;
    console.log("AuthService: isUserAuthenticated =", isUserAuthenticated);
    return !!this.fireauth.currentUser;
  }

  // metodo de login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.loginSuccess = true; // Login bem-sucedido
        this.router.navigate(['/home']);
      } else {
        this.loginSuccess = false; // Login com falha (email não verificado)
        this.router.navigate(['/verify-email']);
      }
    }, (err) => {
      this.loginSuccess = false; // Login com falha (erro)
      alert('Algo está errado');
      this.router.navigate(['/login']);
    });
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
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Algo está errado');
    })
    }

  // verificação de email
  sendEmailVerification(user : any) {
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Algo está errado. Não cosnigo enviar o email de confirmação.')
    })
  }
  }

  




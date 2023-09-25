import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, push, onValue  } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSuccess: boolean | undefined;
  angularFireAuth: any;
  
  app: FirebaseApp;
  db: Database;

  constructor( private fireauth : AngularFireAuth, private router : Router) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
        console.log('Usuário autenticado:', user);
      } else {
        console.log('Nenhum usuário autenticado');
      }
    });

    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);

   }  

  isLoggedIn(): boolean {
    return !!this.fireauth.currentUser;
  }

  // metodo de login
  login(email: string, password: string) {
 //  this.fireauth.setPersistence('local').then(() => { 
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
 // });
  }
  
  //metodo de cadastro
  register(email : string, password : string, user : string, name : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Cadastro efetuado com sucesso');
      this.router.navigate(['/login']);
      this.sendEmailVerification(res.user);

      this.saveUser(res.user!.uid, name, user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //metodo para salvar informações
  saveUser(userId: string, name: string, user: string){
    set(ref(this.db, 'users/' + userId), {
      name: name,
      user: user,
    });
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
      alert('Algo está errado. Não consigo enviar o email de confirmação.')
    })
  }
  }

  



import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/profileUser'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userProfile: UserProfile 
  ) {}

  ngOnInit(): void {
    // alterar para receber o valor do UID ou ID do perfil/chat, não o valor fixo 
    const userId = '9cxOwvav3QemLGt916s4o6rrl3m1';
    // const userId = user.uid;
    this.userProfile.getUserData(userId)
      .then((userData: any) => {
        console.log('Dados do usuário:', userData);
        this.userData = userData;
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do usuário:', error);
      });
  }

  home() {
    this.router.navigate(['/home']);
  }

  logout(){
    this.router.navigate(['/logout']);
  }
}
// a ideia é usar o id do chat ou do propio perfil para acessar as informações e depois altera-las
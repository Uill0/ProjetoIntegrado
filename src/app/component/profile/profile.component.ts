import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/profileUser'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  user: any;
  userId: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userProfile: UserProfile,
    private fireauth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid; // Obtém o UID do usuário atual
        this.userProfile.getUserData(this.userId)
          .then((userData: any) => {
            console.log('Dados do usuário:', userData); 
            this.userData = userData;
          })
          .catch((error) => {
            console.error('Erro ao buscar dados do usuário:', error);
          })
      }
    });
  
  }

  home() {
    this.router.navigate(['/home']);
  }

  logout(){
    this.router.navigate(['/login']);
  }
}

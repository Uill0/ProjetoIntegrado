import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { UserType } from 'src/app/component/register/register.component'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserProfile } from 'src/app/models/profileUser'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  userType: UserType = UserType.Aluno;
  userData: any;
  user: any;
  userId: string | null = null;
  constructor(
    private auth : AuthService, 
    private router : Router,
    private fireAuth : AngularFireAuth,
    private userProfile : UserProfile,
    
    ) { }
  
  ngOnInit(): void {

    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        const userId = this.userId;
        this.userProfile.getUserData(userId)
          .then((userData: any) => {
            this.userData = userData;

            // Resgata o valor de userType do banco de dados
            // em html usa para expecificar quem pode ver o recurso (*ngIf="userType === 'Admin' || userType === 'Ministrante'")
            if (userData && userData.userType) {
              this.userType = userData.userType; 
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar dados do usuário:', error);
          });
      }
    });
  }
  
  logout(){
    this.auth.logout();
  }

  profile(){
    this.router.navigate(['/profile']);
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }

  listRooms(){
    this.router.navigate(['/listRooms']);
  }
  
  store(){
    this.router.navigate(['/store']);
  }
}

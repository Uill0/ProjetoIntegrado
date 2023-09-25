import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private auth : AuthService, private router : Router) { }

  logout(){
    this.auth.logout();
  }

  profile(){
    this.router.navigate(['/profile']);
  }
}

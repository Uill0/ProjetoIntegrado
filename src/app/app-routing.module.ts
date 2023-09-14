import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { RoomsComponent } from './component/rooms/rooms.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [

 { path: '', redirectTo: 'login',  pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'verify-email', component: VerifyEmailComponent },
 { path: 'forgot-password', component: ForgotPasswordComponent },
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
 { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
 
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

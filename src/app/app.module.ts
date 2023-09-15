import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';


import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomeComponent } from './component/home/home.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { RoomsComponent } from './component/rooms/rooms.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    RoomsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]

  
})
export class AppModule { }

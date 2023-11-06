import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, getDatabase, ref, set, push, onValue, DataSnapshot  } from "firebase/database";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserProfile {

  app: FirebaseApp;
  db: Database;
  constructor(private fireauth : AngularFireAuth, private router : Router) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
   }

   getUserData(userId: string): Promise<any> {
    const userRef = ref(this.db, `users/${userId}`);
    return new Promise((resolve, reject) => {
      onValue(userRef, (snapshot: DataSnapshot) => {
        const userData = snapshot.val();
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    });
  }

 
}

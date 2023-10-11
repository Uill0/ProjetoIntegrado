import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, getDatabase, ref, set, push, onValue, DataSnapshot  } from "firebase/database";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
    providedIn: 'root'
  })
  export class RoomProfile {
  
    app: FirebaseApp;
    db: Database;
    constructor(private fireauth : AngularFireAuth, private router : Router) {
      this.app = initializeApp(environment.firebase);
      this.db = getDatabase(this.app);
     }

     getRoomData(roomId: string): Promise<any> {
        const roomRef = ref(this.db, `rooms/'${roomId}`);
        return new Promise((resolve, reject) => {
          onValue(roomRef, (snapshot: DataSnapshot) => {
            const roomData = snapshot.val();
            resolve(roomData);
          }, (error) =>  {
            reject(error);
          });
        });
    
      }
    }
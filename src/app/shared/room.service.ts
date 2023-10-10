import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class RoomService {

    app: FirebaseApp;
    db: Database;

    constructor( private fireauth : AngularFireAuth, private router : Router){

        this.app = initializeApp(environment.firebase);
        this.db = getDatabase(this.app);
    }

    createChatRoom(roomName: string) {
        const newRoomId = uuidv4();
        const newRoom = {
            id: newRoomId,
            name: roomName,
            users: []
        };

     //   this.db.object(`/chatRooms/${newRoomId}`).set(newRoom);
        set(ref(this.db, 'rooms/' + newRoomId), {
            roomName: roomName
        })

        return newRoomId;
    }
    
}
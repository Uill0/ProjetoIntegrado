import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { RoomProfile } from '../models/profileRoom';


@Injectable({
    providedIn: 'root'
})

export class RoomService {

    app: FirebaseApp;
    db: Database;
    room: any;

    constructor( private fireauth : AngularFireAuth, private router : Router){

        this.app = initializeApp(environment.firebase);
        this.db = getDatabase(this.app);
    }

    createRoom(roomName: string) {
        const RoomId = uuidv4();
        const newRoom = {
            id: RoomId,
            name: roomName,
            users: []
        };

        set(ref(this.db, 'rooms/' + RoomId), {
            roomName: roomName
        })

        return RoomId;
    }
    
    
}
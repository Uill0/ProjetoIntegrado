import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

import { RoomService } from 'src/app/shared/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  roomName: any;

  constructor( 
    private auth : AuthService, 
    private router : Router,
    private roomService : RoomService
     ){}
  
     createRoom(){
      if(this.roomName.trim() !== '') {
        const roomId = this.roomService.createRoom(this.roomName);

        console.log('Sala criada com o ID:', roomId);

        this.roomName = '';
      }
     }
  
 
}

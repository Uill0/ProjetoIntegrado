import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from 'src/app/shared/chat';
import { UserProfile } from 'src/app/models/profileUser'; 
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  title = 'firechat';
  app: FirebaseApp;
  db: Database; 
  form: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];

  userData: any;
  user: any;
  userId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userProfile: UserProfile,
    private fireAuth: AngularFireAuth,
    
    ) {


    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : []
    });
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();

    // resgasta as informações do banco de dados
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid; // Obtém o UID do usuário atual
        const userId = this.userId;
        this.userProfile.getUserData(userId)
          .then((userData: any) => {
            this.userData = userData;
          })
          .catch((error) => {
            console.error('Erro ao buscar dados do usuário:', error);
          })
      }
    });

    set(ref(this.db, `chats/${chat.id}`), chat);


    this.form = this.formBuilder.group({
      'message' : [],
      'username' : [chat.username],
    });
  }

  ngOnInit(): void {
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  }

}

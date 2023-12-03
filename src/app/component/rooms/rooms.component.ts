import { Component, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from 'src/app/shared/chat';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserProfile } from 'src/app/models/profileUser';


interface VideoData {
  videoUrl: string;
  timestamp: string;
  // Adicione outras propriedades necessárias
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  @ViewChild('chatBox', { static: true }) private chatBoxRef!: ElementRef;
  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];
  youtubeVideoUrl = '';
  showYoutubeVideo = false;

  videoData: any;
  videoUrl: any;

  roomData: any;
  room: any;
  roomId: string | null = null;

  userData: any;
  user: any;
  userId: string | null = null;

  

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private userProfile: UserProfile,
    private fireauth: AngularFireAuth
  ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      message: [],
      username: [],
      youtubeVideoUrl: [],
    });
  }

  onChatSubmit(formValue: any): void {
    const chat = {
      username: this.userData?.name || 'Anônimo',
      message: formValue.message,
      timestamp: new Date().toString(),
      id: uuidv4(),
    };

    set(ref(this.db, `chats/${chat.id}`), chat);

    // Limpe a mensagem, mas mantenha o nome de usuário
    this.form.setValue({ username: this.userData?.name, message: '' });
    this.scrollToBottom();
  }

  onVideoSubmit(): void {
    const videoId = this.extractVideoId(this.youtubeVideoUrl);
    const videoData = {
      videoUrl: this.youtubeVideoUrl, // Salva o URL completo do vídeo do YouTube
      id: uuidv4(),
    };
  
    set(ref(this.db, `videos/${videoData.id}`), videoData);
    
  }

  scrollToBottom(): void {
    try {
      this.chatBoxRef.nativeElement.scrollTop = this.chatBoxRef.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnInit(): void {
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for (let id in data) {
        if (!this.chats.map((chat) => chat.id).includes(id)) {
          this.chats.push(data[id]);
        }
      }
    });

    const videoRef = ref(this.db, 'videos');
    onValue(videoRef, (snapshot: any) => {
      const data = snapshot.val();
      const video: any = Object.values(data).pop()
      this.youtubeVideoUrl = video.videoUrl
      this.showYoutubeVideo = true;
    });

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid; // Obtém o UID do usuário atual
        this.userProfile
          .getUserData(this.userId)
          .then((userData: any) => {
            console.log('Dados do usuário:', userData);
            this.userData = userData;
          })
          .catch((error) => {
            console.error('Erro ao buscar dados do usuário:', error);
          });
      }
    });
  }

  getEmbedUrl(): SafeResourceUrl {
    const videoId = this.extractVideoId(this.youtubeVideoUrl);
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  private extractVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2]) || '';
  }

  openCreateQuestionForm() {
    this.router.navigate(['/create-question']);
  }
}

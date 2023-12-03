// video.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private collectionName = 'videos';

  constructor(private fireauth: AngularFireAuth) {}

  saveVideoUrl(videoUrl: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc('video').set({ videoUrl });
  }

  getVideoUrl(): Observable<any> {
    return this.firestore.collection(this.collectionName).doc('video').valueChanges();
  }
}

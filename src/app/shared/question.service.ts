import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Database } from '@angular/fire/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  app: FirebaseApp;
  db: Database;

  private questions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private showQuestionsSubject = new BehaviorSubject<boolean>(false);
  showQuestions$ = this.showQuestionsSubject.asObservable();

  toggleShowQuestions() {
    this.showQuestionsSubject.next(!this.showQuestionsSubject.value);
  }

  constructor(private fireauth: AngularFireAuth) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.loadQuestions();
  }

  getQuestions(): BehaviorSubject<any[]> {
    return this.questions;
  }

  addQuestion(question: any): void {
    const newQuestionId = uuidv4();
    question.id = newQuestionId;

    set(ref(this.db, `questions/${newQuestionId}`), question);
  }

  loadQuestions(): void {
    const questionsRef = ref(this.db, 'questions');
    
    onValue(questionsRef, (snapshot) => {
      const questionsData = snapshot.val();
      if (questionsData) {
        const questionsArray = Object.values(questionsData);
        this.questions.next(questionsArray);
      }
    });
  }

}

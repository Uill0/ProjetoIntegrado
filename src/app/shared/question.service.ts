// question.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    this.questions.next([]);
  }

  getQuestions(): BehaviorSubject<any[]> {
    return this.questions;
  }

  addQuestion(question: any): void {
    const currentQuestions = this.questions.value;
    currentQuestions.push(question);
    this.questions.next(currentQuestions);
  }
}

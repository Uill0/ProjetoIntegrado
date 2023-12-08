import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})

export class CreateQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  questions: any[] = [];
  editingQuestion: any = null;

  showQuestions: boolean = false;

  constructor(private fb: FormBuilder, public questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      correctOption: [null, Validators.required],
    });

    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const questionData = this.questionForm.value;
      this.questionService.addQuestion(questionData);
      this.questionForm.reset();
    }
  }

  editQuestion(question: any) {
    this.editingQuestion = { ...question };
  }

  saveQuestionEdit() {
    const index = this.questions.findIndex(q => q.id === this.editingQuestion.id);
    if (index !== -1) {
      this.questions[index] = { ...this.editingQuestion };
      this.editingQuestion = null;
    }
  }

  cancelQuestionEdit(){
    this.editingQuestion = null;
  }

  toggleShowQuestions(): void {
    this.showQuestions = !this.showQuestions;
  }

  
  processAnswers(): void {
    const selectedQuestions = this.questions.filter(question => question.selected);

    console.log('Respostas selecionadas:', selectedQuestions);
  }

}


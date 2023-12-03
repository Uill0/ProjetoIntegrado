import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})


export class CreateQuestionComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder, private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const questionData = this.questionForm.value;
      this.questionService.addQuestion(questionData);
      this.questionForm.reset();
    }
  }
}

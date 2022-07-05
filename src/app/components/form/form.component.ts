import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionBase } from 'src/app/question-base';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionService, QuestionControlService ]
})
export class FormComponent implements OnInit {

  //@Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  questionsObs: Observable<QuestionBase<any>[]>;
  questions: QuestionBase<string>[] | null = [];

  constructor(
    private qs: QuestionService,
    private qcs: QuestionControlService,
    private router: Router
  ) {
    this.questionsObs = this.qs.getQuestions();
  }

  ngOnInit() {
    this.questionsObs.subscribe(q => {
      this.questions = q;
      this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}

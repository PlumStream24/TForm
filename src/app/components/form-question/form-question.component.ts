import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from 'src/app/models/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() docId!: string;
  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    setTimeout(() => {
      console.log("persist");
      localStorage.removeItem(`${this.docId}-persist`);
      localStorage.setItem(`${this.docId}-persist`, JSON.stringify(this.form.getRawValue()));
    }, 200);
  }

}

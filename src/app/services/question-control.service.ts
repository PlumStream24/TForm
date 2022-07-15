import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from 'src/app/models/question-base';

@Injectable()
export class QuestionControlService {
  constructor(private _formBuilder: FormBuilder) { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      if (question.controlType == 'checkbox') {
        let childGroup: any = {};
        question.options.forEach(keyvalue => {
          childGroup[keyvalue.key] = false;
        })
        group[question.key] = this._formBuilder.group(childGroup);
      } else {
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
      }
    });
    return new FormGroup(group);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

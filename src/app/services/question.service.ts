import { Injectable } from '@angular/core';

import { QuestionBase, QuestionIntf } from 'src/app/models/question-base';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: QuestionBase<string>[] = [];

  constructor(private afs: AngularFirestore) {

  }

  getQuestions2() {
    return this.afs.collection('form-questions', ref => ref.where('recipients', 'array-contains', 'sigid.iqbal123@gmail.com'))
    .valueChanges() as Observable<QuestionIntf[]>
  }

  // TODO: get from a remote source of question metadata
  getQuestions(questionsI : QuestionIntf) {

    for (let question of questionsI.questions) {
      let q : QuestionBase<string> = new QuestionBase<string>({
        value: question.value,
        key: question.key,
        label: question.label,
        required: question.required,
        order: question.order,
        type: question.type,
        options: question.options,
        controlType: question.controlType
      });

      this.questions.push(q);
    }

    return of(this.questions.sort((a, b) => a.order - b.order));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

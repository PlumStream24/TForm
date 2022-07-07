import { Injectable } from '@angular/core';

import { QuestionBase, QuestionIntf } from 'src/app/question-base';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  questions: QuestionBase<string>[] = [];

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questionsI: QuestionIntf = {
      formTitle: "Form Title",
      authorName: "Author Name",
      authorEmail: "email@author.com",
      recipients: ["sigid.iqbal123@gmail.com"],
      questions: [
        {
          key: 'rating',
          label: 'Rating',
          options: [
            {key: 'solid',  value: 'Solid'},
            {key: 'great',  value: 'Great'},
            {key: 'good',   value: 'Good'},
            {key: 'unproven', value: 'Unproven'}
          ],
          order: 3,
          controlType: 'dropdown'
        },
        {
          key: 'firstName',
          label: 'First name',
          value: 'Bombasto',
          required: true,
          order: 1,
          controlType: 'textbox'
        },
        {
          key: 'emailAddress',
          label: 'Email',
          type: 'email',
          order: 2,
          controlType: 'textbox'
        },
        {
          key: 'season',
          label: 'Favorite season',
          type: 'radio',
          options: [
            {key: 'spring',  value: 'Spring'},
            {key: 'summer',  value: 'Summer'},
            {key: 'autumn',   value: 'Autumn'},
            {key: 'winter', value: 'Winter'}
          ],
          order: 4,
          controlType: 'radio'
        }
      ],
      createdAt: new Date('24-04-2022')
    }

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

    // const questions: QuestionBase<string>[] = [

    //   new DropdownQuestion({
    //     key: 'rating',
    //     label: 'Rating',
    //     options: [
    //       {key: 'solid',  value: 'Solid'},
    //       {key: 'great',  value: 'Great'},
    //       {key: 'good',   value: 'Good'},
    //       {key: 'unproven', value: 'Unproven'}
    //     ],
    //     order: 3
    //   }),

    //   new TextboxQuestion({
    //     key: 'firstName',
    //     label: 'First name',
    //     value: 'Bombasto',
    //     required: true,
    //     order: 1
    //   }),

    //   new TextboxQuestion({
    //     key: 'emailAddress',
    //     label: 'Email',
    //     type: 'email',
    //     order: 2
    //   }),

    //   new RadioQuestion({
    //     key: 'season',
    //     label: 'Favorite season',
    //     type: 'radio',
    //     options: [
    //       {key: 'spring',  value: 'Spring'},
    //       {key: 'summer',  value: 'Summer'},
    //       {key: 'autumn',   value: 'Autumn'},
    //       {key: 'winter', value: 'Winter'}
    //     ],
    //     order: 4
    //   }),
    // ];

    return of(this.questions.sort((a, b) => a.order - b.order));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

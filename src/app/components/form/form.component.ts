import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionBase, QuestionIntf } from 'src/app/models/question-base';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { Observable } from 'rxjs';
import { ResponseIntf } from 'src/app/models/response-base';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-base';

import { QuestionService } from 'src/app/services/question.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionService, QuestionControlService ]
})
export class FormComponent implements OnInit {

  user$?: User;
  form!: FormGroup;
  questions: QuestionBase<string>[] | null = [];
  questionsI: QuestionIntf[] = [];
  doc?: QuestionIntf;

  constructor(
    private qs: QuestionService,
    private qcs: QuestionControlService,
    private router: ActivatedRoute,
    private toast: HotToastService,
    private userService: UsersService
  ) {
    userService.currentUser$.subscribe(data => {
      if (data != null) this.user$ = data;
    });
  }

  ngOnInit() {
    const routeParams = this.router.snapshot.paramMap;
    const docIdFromRoute = routeParams.get('docId');

    this.qs.getQuestions2().subscribe(qI => {
      this.questionsI = qI;
      this.doc = this.questionsI.find(form => form.docId === docIdFromRoute);
      let questionsObs = this.qs.getQuestions(this.doc!);
      questionsObs.subscribe(q => {
        this.questions = q;
        this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
      })

    });
  }

  onSubmit() {
    let payLoad = this.form.getRawValue();
    let response : ResponseIntf = {
      docId: this.doc?.docId,
      respondent: this.user$?.email,
      answer: payLoad
    }
    this.qs.submitAnswer(response).pipe(
      this.toast.observe({
        success: "Sent!",
        loading: "Sending response...",
        error: "An error occured"
      })
    ).subscribe();
  }

}

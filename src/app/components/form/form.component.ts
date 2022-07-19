import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionBase, QuestionIntf } from 'src/app/models/question-base';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { Observable, auditTime, take } from 'rxjs';
import { ResponseIntf } from 'src/app/models/response-base';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-base';
import 'src/app/models/sync-manager';

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
    this.form = new FormGroup({});
    const routeParams = this.router.snapshot.paramMap;
    const docIdFromRoute = routeParams.get('docId');

    this.qs.getQuestions2().pipe(auditTime(200), take(1)).subscribe(res => {
      this.questionsI = res;
      this.doc = this.questionsI.find(form => form.docId === docIdFromRoute);
      let questionsObs = this.qs.getQuestions(this.doc!);
      questionsObs.subscribe(q => {
        this.questions = q;
        this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
        let fa = localStorage.getItem('form-persist')
        if (fa) {
          let fs = JSON.parse(fa);
          this.form.setValue(fs);
        }
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
        success: "Sent!"
      })
    ).subscribe(
      err => {
        localStorage.removeItem("form-bgsync");
        localStorage.setItem("form-bgsync", JSON.stringify(this.form.getRawValue()));
        navigator.serviceWorker.ready.then((swRegistration) =>
          swRegistration.sync.register('submit')
        ).catch(console.log)
      }
    );
  }

  reset() {
    this.form.reset();
    localStorage.removeItem("form-persist");
  }

}

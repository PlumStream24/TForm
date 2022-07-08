import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-base';
import { QuestionIntf } from 'src/app/models/question-base';
import { QuestionService } from 'src/app/services/question.service';

import { Router } from '@angular/router';

export interface Forms {
  name: string;
  creator: string;
  date: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$?: User;
  unfilledForms: QuestionIntf[] = [];
  filledForms: QuestionIntf[] = [];

  constructor(
    private userService: UsersService,
    private qs: QuestionService,
    private router: Router
  ) {
    userService.currentUser$.subscribe(data => {
      if (data != null) this.user$ = data;
    });
  }

  ngOnInit(): void {
    this.qs.getQuestions2().subscribe(q => {
      this.unfilledForms = q
    });
  }

}

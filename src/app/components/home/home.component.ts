import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-base';
import { QuestionIntf } from 'src/app/models/question-base';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  notifEnabled: boolean;
  defaultURL = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  constructor(
    private userService: UsersService,
    private qs: QuestionService,
    private router: Router,
    private afMessaging: AngularFireMessaging,
    private authService: AuthenticationService
  ) {
    userService.currentUser$.subscribe(data => {
      if (data != null) this.user$ = data;
    });
    this.notifEnabled = this.notifPermission();
  }

  ngOnInit(): void {
    this.qs.getQuestions2().subscribe(q => {
      this.unfilledForms = q
    });
    //this.requestPermission();
  }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { 
          console.log('Permission granted! Save to the server!', token);
          if (token != null) {
            this.userService.updateToken(this.user$!, token!);
          }
        },
        (error) => { console.error(error); },  
      );
  }

  notifPermission() {
    return Notification.permission == 'granted';
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    })
  }

}

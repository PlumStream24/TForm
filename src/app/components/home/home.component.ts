import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-base';
import { QuestionIntf } from 'src/app/models/question-base';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SwPush } from '@angular/service-worker';

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
  pushNotif: PushSubscription | null = null;
  private readonly notifPublicKey = 'BPfuGqkKjhZ6KGBzJaJUKO1XkxjGQgAmYA3WZqIigu8xq129o542EoiQJuGV7gEykSTAVmUOE_aDklOU8FuiaOo';
  readonly defaultURL = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  constructor(
    private userService: UsersService,
    private qs: QuestionService,
    private router: Router,
    private authService: AuthenticationService,
    private swPush: SwPush
  ) {
    userService.currentUser$.subscribe(data => {
      if (data != null) this.user$ = data;
    });
    this.notifEnabled = this.notifPermission();
  }

  ngOnInit(): void {
    this.qs.getQuestions2().subscribe(q => {
      this.unfilledForms = q.sort((a, b) => b.createdAt - a.createdAt);
    });
    this.pushNotification();
  }

  /*
  requestPermission() {
    this.afMessaging.requestPermission
      .subscribe(
        (token) => { },
        (error) => { console.error(error); },  
      );

    this.afMessaging.requestToken
      .subscribe(
        (token) => { 
          console.log(token);
          if (token != null) {
            this.userService.updateToken(this.user$!, token!);
          }
        },
        (error) => { console.error(error); },  
      );
  }
  */

  pushNotification() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.notifPublicKey
    })
    .then(sub => {
      console.log(JSON.stringify(sub))
      this.pushNotif = sub;
      if (this.pushNotif != null) {
        this.userService.updateToken(this.user$!, JSON.stringify(this.pushNotif));
      }
      this.notifEnabled = this.notifPermission();
    })
    .catch(err => console.log(err))
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

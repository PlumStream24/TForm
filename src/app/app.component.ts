import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TForm';
  offline : boolean;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private swPush: SwPush
  ) {
    this.offline = !navigator.onLine;
  }

  ngOnInit(): void {
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));

    this.swPush.messages.subscribe(message => console.log(message));
    this.swPush.notificationClicks.subscribe(
      ({action, notification}) => {
        window.open(notification.data);
      }
    )
  }

  onNetworkStatusChange(): void {
    this.offline = !navigator.onLine;
    if (this.offline) {
      this.toast.info("You are now offline");
    } else {
      this.toast.info("You are now online");
    }
  }

}

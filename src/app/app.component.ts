import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

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
    private afMessaging: AngularFireMessaging
  ) {
    this.offline = !navigator.onLine;
  }
  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  ngOnInit(): void {
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  onNetworkStatusChange(): void {
    this.offline = !navigator.onLine;
    if (this.offline) {
      this.toast.info("You are now offline");
    } else {
      this.toast.info("You are now online");
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }
}

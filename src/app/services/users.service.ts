import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';
import { User } from 'src/app/models/user-base'
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthenticationService) { }

  get currentUser$() {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null)
        }

        const ref = doc(this.firestore, 'accounts', user?.uid);
        return docData(ref) as Observable<User>;
      })
    )
  }
}

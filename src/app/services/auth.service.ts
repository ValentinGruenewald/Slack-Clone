import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';
import {
  Auth,
  UserInfo,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    public firebaseAuth: AngularFireAuth,
    private auth: Auth,
    public router: Router,
    private toast: HotToastService
  ) {}

  signUp(email, password) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }

  login(username, password) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

logOut() {
  this.auth.signOut().then(() => {
    this.router.navigate(['']);
    this.toast.success('You have been successfully logged out.');
  });
}

GoogleAuth() {
  return this.AuthLogin(new GoogleAuthProvider());
}

AuthLogin(provider) {
  return this.firebaseAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['/client']);
      this.toast.success('You have been successfully logged in!');
    })
    .catch((error) => {
      console.log(error);
      this.toast.error('There was an error while logging in.');
    });
  }

  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('You are not Authenticated');
        return updateProfile(user,profileData)
      })
    );
  }
}

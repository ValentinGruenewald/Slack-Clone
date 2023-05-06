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
import { UserProfile } from 'src/models/user-profile';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    public firebaseAuth: AngularFireAuth,
    private auth: Auth,
    public router: Router,
    private toast: HotToastService,
    private firestore: Firestore
  ) {}

  signUp(email, password) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
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
        const user = result.user;
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        return this.addUser(userData);
      })
      .then(() => {
        this.router.navigate(['/client']);
        this.toast.success('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
        this.toast.error('There was an error while logging in.');
      });
  }

  addUser(user: UserProfile): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
}

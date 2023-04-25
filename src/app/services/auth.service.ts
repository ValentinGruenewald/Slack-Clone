import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private auth: Auth,
    public router: Router
  ) {}

  // async login(email, password) {
  //   await this.firebaseAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       this.isLoggedIn = true;
  //       localStorage.setItem('user', JSON.stringify(response.user));
  //              console.log(response.user);
  //     });
  // }

  login(username, password) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  async signup(email, password) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(response.user));
      });
  }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/client']);
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

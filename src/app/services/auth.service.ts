import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth) {}

  async signin(email, password) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(response.user));
      });
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
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

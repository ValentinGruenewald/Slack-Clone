import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { UserProfile } from 'src/models/user-profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get currentUserProfile$(): Observable<UserProfile | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<UserProfile>;
      })
    );
  }

  constructor(private firestore: Firestore, private authService: AuthService) {}

  addUser(user: UserProfile): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserProfile): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMenuOpen$ = this.isMenuOpenSubject.asObservable();

  toggleMenu(status: boolean) {
    this.isMenuOpenSubject.next(status);
    console.log(status)
  }
}

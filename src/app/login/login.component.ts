import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
//import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  email = this.loginForm.get('email');
  password = this.loginForm.get('password');

  constructor(
    public authService: AuthService,
    public router: Router,
   // private toast: HotToastService
  ) {}

  ngOnInit() {}

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        // this.toast.observe({
        //   success: 'Logged in successfully',
        //   loading: 'Logging in ...',
        //   error: 'There was an error',
        // })
      )
      .subscribe(() => {
        this.router.navigate(['/client']);
      });
  }
}

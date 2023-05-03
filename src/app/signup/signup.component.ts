import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from '../services/users.service';
import { switchMap } from 'rxjs';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  name = this.signUpForm.get('name');
  email = this.signUpForm.get('email');
  password = this.signUpForm.get('password');
  confirmPassword = this.signUpForm.get('confirmPassword');

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    console.log(this.signUpForm.value.name);
  }

   submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, displayName: name })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/client']);
      });
  }
}

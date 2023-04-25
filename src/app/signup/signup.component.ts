import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  createUser: FormGroup;
  isNewUser = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public db: AngularFirestore,
    public router: Router
  ) {}

  ngOnInit() {}
}

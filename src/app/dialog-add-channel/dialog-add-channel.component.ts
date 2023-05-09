import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chat.class';
import { UsersService } from '../services/users.service';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  chat = new Chat();
  allUsers = [];
  currentUserId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogAddChannelComponent>,
    private firestore: AngularFirestore,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.usersService.currentUserProfile$.subscribe((userProfile) => {
      this.currentUserId = userProfile.uid;
    });
    setTimeout(() => {
      console.log(this.allUsers);
      this.deleteCurrentUserFromAllUsers();
    }, 100);
  }

  getAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  deleteCurrentUserFromAllUsers() {
    console.log(this.findUserNumber(this.currentUserId));
    this.allUsers.splice(this.findUserNumber(this.currentUserId), 1);
    console.log(this.allUsers);
  }

  findUserNumber(currentId: string) {
    return this.allUsers.map((e) => e.uid).indexOf(currentId);
  }

  saveChat() {
    this.firestore
      .collection('chats')
      .add(this.chat.toJSON())
      .then((result: any) => {
        console.log('Adding user finished' + result);
        this.dialogRef.close();
      });
  }
}

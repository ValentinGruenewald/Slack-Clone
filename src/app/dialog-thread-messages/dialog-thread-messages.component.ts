import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/models/message.class';
import { UsersService } from '../services/users.service';
import { ThreadMessage } from 'src/models/thread-message.class';
import { DialogUserInfoComponent } from '../dialog-user-info/dialog-user-info.component';

@Component({
  selector: 'app-dialog-thread-messages',
  templateUrl: './dialog-thread-messages.component.html',
  styleUrls: ['./dialog-thread-messages.component.scss'],
})
export class DialogThreadMessagesComponent implements OnInit {
  messages = this.data.threadMessages;
  chat = this.data.chat;
  chatId = this.data.chatId;
  messageNr = this.data.messageNr;
  allUsers: any = [{}, {}];
  currentUserId: string;
  messageValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogThreadMessagesComponent>,
    private firestore: AngularFirestore,
    private usersService: UsersService,
    public dialog: MatDialogRef<DialogThreadMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getCurrentUser();
  }

  getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  findUser(id: string) {
    return this.allUsers.filter((user) => user.customIdName === id)[0];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCurrentUser() {
    this.usersService.currentUserProfile$.subscribe((userProfile) => {
      if (userProfile) {
        this.currentUserId = userProfile.uid;
      }
    });
  }

  sendMessage(message: string) {
    if (message == '') {
    } else {
      let sentThreadMessage = new ThreadMessage({
        userId: this.currentUserId,
        message: message,
      });
      this.chat.messages[this.messageNr].threadMessages.push(
        sentThreadMessage.toJSON()
      );
      this.firestore.collection('chats').doc(this.chatId).update(this.chat);
      this.messageValue = '';
    }
  }
}

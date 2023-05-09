import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chat.class';
import { UsersService } from '../services/users.service';
import { JsonMessage } from 'src/models/message.class';

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
    this.allUsers.splice(this.findUserNumber(this.currentUserId), 1);
  }

  findUserNumber(currentId: string) {
    return this.allUsers.map((e) => e.uid).indexOf(currentId);
  }

  saveChat() {
    this.addChatConfigurations();
    this.firestore
      .collection('chats')
      .add(this.chat.toJSON())
      .then((result: any) => {
        console.log('Adding chat finished' + result);
        this.dialogRef.close();
      });
  }

  addChatConfigurations() {
    this.chat.groupchat = true;
    let firstMessage: JsonMessage = {
      createdAt: Intl.DateTimeFormat('de-DE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date()),
      message: 'Welcome to the groupchat ' + this.chat.chatName + '.',
      userId: 'vs2DTr1B3vqplKnTZx7O',
    };
    this.chat.messages = [firstMessage];
    this.addUsersToChat();
  }

  addUsersToChat() {
    for (let i = 0; i < this.allUsers.length; i++) {
      console.log('hehe');
    }
  }
}

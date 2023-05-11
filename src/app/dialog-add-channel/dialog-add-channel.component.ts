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
  allNonAddedUsers = [];
  allAddedUsers = [];
  currentUserId: string;
  currentUserName: string;

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
      this.deleteCurrentUserFromList();
    }, 100);
  }

  getAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allNonAddedUsers = changes;
      });
  }

  deleteCurrentUserFromList() {
    this.currentUserName =
      this.allNonAddedUsers[
        this.findUserNumber(this.currentUserId)
      ].displayName;
    this.allNonAddedUsers.splice(this.findUserNumber(this.currentUserId), 1);
  }

  findUserNumber(currentId: string) {
    return this.allNonAddedUsers.map((e) => e.uid).indexOf(currentId);
  }

  saveChat() {
    if (this.chat.chatName == '') {
    } else {
      this.addChatConfigurations();
      this.firestore
        .collection('chats')
        .add(this.chat.toJSON())
        .then((result: any) => {
          console.log('Adding chat finished' + result);
          this.dialogRef.close();
        });
    }
  }

  addChatConfigurations() {
    this.chat.groupchat = true;
    let firstMessage: JsonMessage = {
      createdAt: Intl.DateTimeFormat('de-DE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date()),
      message:
        this.currentUserName +
        ' created the groupchat ' +
        this.chat.chatName +
        '.',
      userId: 'vs2DTr1B3vqplKnTZx7O',
    };
    this.chat.messages = [firstMessage];
    this.addMessageToInformWhoIsInChat();
    this.addUsersToChat();
  }

  addUsersToChat() {
    this.chat.userIds = this.allAddedUsers.map((user) => user.uid);
    this.chat.userIds.push(this.currentUserId);
  }

  addUserToChat(i) {
    this.allAddedUsers.push(this.allNonAddedUsers[i]);
    this.allNonAddedUsers.splice(i, 1);
  }

  deleteUserFromChat(i) {
    this.allNonAddedUsers.push(this.allAddedUsers[i]);
    this.allAddedUsers.splice(i, 1);
  }

  addMessageToInformWhoIsInChat() {
    let secondMessage: JsonMessage = {
      createdAt: Intl.DateTimeFormat('de-DE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date()),
      message: this.addedUserNamesAsMessage(),
      userId: 'vs2DTr1B3vqplKnTZx7O',
    };
    this.chat.messages.push(secondMessage);
  }

  addedUserNamesAsMessage() {
    if (this.allAddedUsers.length == 0) {
      return this.currentUserName + ' created the chat.';
    } else {
      return (
        this.currentUserName +
        ' added ' +
        this.checkIfOneOrMoreExtraAddedUsers() +
        ' to the groupchat ' +
        this.chat.chatName +
        '.'
      );
    }
  }

  checkIfOneOrMoreExtraAddedUsers() {
    if (this.allAddedUsers.length == 1) {
      return this.allAddedUsers[0].displayName;
    } else {
      let message: string = this.allAddedUsers
        .map((user) => user.displayName)
        .toString()
        .replace(/,/g, ', ');
      const lastIndex = message.lastIndexOf(',');
      message =
        message.substring(0, lastIndex) +
        ' and' +
        message.substring(lastIndex + 1);
      return message;
    }
  }
}

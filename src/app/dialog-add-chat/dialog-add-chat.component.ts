import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chat.class';
import { UsersService } from '../services/users.service';
import { JsonMessage } from 'src/models/message.class';

@Component({
  selector: 'app-dialog-add-chat',
  templateUrl: './dialog-add-chat.component.html',
  styleUrls: ['./dialog-add-chat.component.scss'],
})
export class DialogAddChatComponent {
  chat = new Chat();
  allNonAddedUsers = [];
  allAddedUsers = [];
  currentUserId: string;
  currentUserName: string;
  selectedUser: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddChatComponent>,
    private firestore: AngularFirestore,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.usersService.currentUserProfile$.subscribe((userProfile) => {
      this.currentUserId = userProfile.uid;
      this.deleteCurrentUserFromList();
    });
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
    this.addChatConfigurations();
    this.firestore
      .collection('chats')
      .add(this.chat.toJSON())
      .then((result: any) => {
        this.dialogRef.close();
      });
    console.log(this.allAddedUsers);
  }

  addChatConfigurations() {
    this.chat.groupchat = false;
    let firstMessage: JsonMessage = {
      createdAt: Intl.DateTimeFormat('de-DE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date()),
      message:
        this.currentUserName + ' opened the Chat ' + this.chat.chatName + '.',
      userId: 'vs2DTr1B3vqplKnTZx7O',
      threadMessages: [],
    };
    this.chat.messages = [firstMessage];
    this.addUsersToChat();
  }

  saveChatAndAddUser() {
    const selectedIndex = this.allNonAddedUsers.indexOf(this.selectedUser);
    this.addUserToChat(selectedIndex);
    this.saveChat();
  }

  addUsersToChat() {
    this.chat.userIds = this.allAddedUsers.map((user) => user.uid);
    this.chat.userIds.push(this.currentUserId);
  }

  addUserToChat(i) {
    this.allAddedUsers.push(this.allNonAddedUsers[i]);
    this.allNonAddedUsers.splice(i, 1);
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

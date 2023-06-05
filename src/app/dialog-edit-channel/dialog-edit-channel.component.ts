import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss'],
})
export class DialogEditChannelComponent implements OnInit {
  chat = this.data.chat;
  chatId: any = this.data.chatId;
  allNonAddedUsers = [];
  allUsers = [];
  allAddedUserIds = this.chat.userIds;
  allAddedUsers = [];
  currentUserName: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditChannelComponent>,
    private firestore: AngularFirestore,
    public dialog: MatDialogRef<DialogEditChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    setTimeout(() => {
      this.getAddedUsers();
      this.getNonAddedUsers();
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

  getAddedUsers() {
    this.allAddedUsers = this.allUsers.filter((user) =>
      this.allAddedUserIds.includes(user.uid)
    );
  }

  getNonAddedUsers<T>() {
    const difference: T[] = [...this.allUsers];

    for (const element of this.allAddedUsers) {
      const index = difference.indexOf(element);
      if (index !== -1) {
        difference.splice(index, 1);
      }
    }

    this.allNonAddedUsers = difference;
  }

  findUserNumber(currentId: string) {
    return this.allNonAddedUsers.map((e) => e.uid).indexOf(currentId);
  }

  saveChat() {
    this.addUsersToChat();
    this.firestore
      .collection('chats')
      .doc(this.chatId)
      .update(this.chat)
      .then((result: any) => {
        this.dialogRef.close();
      });
  }

  addUsersToChat() {
    this.chat.userIds = this.allAddedUsers.map((user) => user.uid);
  }

  addUserToChat(i) {
    this.allAddedUsers.push(this.allNonAddedUsers[i]);
    this.allNonAddedUsers.splice(i, 1);
  }

  deleteUserFromChat(i) {
    this.allNonAddedUsers.push(this.allAddedUsers[i]);
    this.allAddedUsers.splice(i, 1);
  }
}

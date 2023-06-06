import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-thread-messages',
  templateUrl: './dialog-thread-messages.component.html',
  styleUrls: ['./dialog-thread-messages.component.scss'],
})
export class DialogThreadMessagesComponent implements OnInit {
  messages = this.data;
  allUsers: any = [{}, {}];

  constructor(
    public dialogRef: MatDialogRef<DialogThreadMessagesComponent>,
    private firestore: AngularFirestore,
    public dialog: MatDialogRef<DialogThreadMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getUsers();
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
}

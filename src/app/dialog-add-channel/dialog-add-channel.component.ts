import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  user = new Chat();
  birthDate: Date = new Date();
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddChannelComponent>,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  saveChat() {

    this.firestore
      .collection('chats')
      .add(this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding user finished' + result);
        this.dialogRef.close();
      });
  }
}

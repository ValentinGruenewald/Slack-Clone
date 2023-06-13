import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-confirm-delete-chat.component.html',
  styleUrls: ['./dialog-confirm-delete-chat.component.scss'],
})
export class DialogConfirmDeleteChatComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogConfirmDeleteChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deleteChat() {
    this.firestore
      .collection('chats')
      .doc(this.data.customIdName)
      .delete()
      .then(() => {
      })
      .catch((error) => {
        console.error('Error deleting chat:', error);
      });
  }
}

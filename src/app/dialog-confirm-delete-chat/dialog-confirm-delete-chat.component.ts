import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-confirm-delete-chat.component.html',
  styleUrls: ['./dialog-confirm-delete-chat.component.scss'],
})
export class DialogConfirmDeleteChatComponent implements OnInit {
  generalChatId = 'JQnRfxS0R5DSVhtVq0rc';

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
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
        this.router.navigate(['/client/' + this.generalChatId]);
      })
      .catch((error) => {
        console.error('Error deleting chat:', error);
      });
  }
}

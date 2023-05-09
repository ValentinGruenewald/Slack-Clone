import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss'],
})
export class DialogUserInfoComponent {
  allUsers;
  
  constructor(public dialogRef: MatDialogRef<DialogUserInfoComponent>) {}

  findUser(id: string) {
    return this.allUsers.filter((user) => user.customIdName === id)[0];
  }
}

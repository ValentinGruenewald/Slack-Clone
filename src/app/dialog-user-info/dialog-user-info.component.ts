import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss'],
})
export class DialogUserInfoComponent implements OnInit{

ngOnInit(): void {
}

  constructor(
    public dialogRef: MatDialogRef<DialogUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmationDialogData {
  title: string,
  content: string
}

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation/confirmation.component.html',
  styleUrls: ['./confirmation/confirmation.component.css']
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {

    }
}
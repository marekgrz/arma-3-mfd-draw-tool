import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mfd-create-source-dialog',
  templateUrl: './create-source-dialog.component.html',
  styleUrls: ['./create-source-dialog.component.less']
})
export class CreateSourceDialogComponent {

  sourceName: string;

  constructor(private dialogRef: MatDialogRef<CreateSourceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    dialogRef.disableClose = true;
  }

  success(): void {
    this.dialogRef.close(this.sourceName);
  }
}
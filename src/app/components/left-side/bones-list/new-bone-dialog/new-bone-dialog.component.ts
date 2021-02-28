import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoneBaseModel, BoneFixedModel, BoneType } from '../BoneBaseModel';

@Component({
  selector: 'app-new-bone-dialog',
  templateUrl: './new-bone-dialog.component.html',
  styleUrls: ['./new-bone-dialog.component.less']
})
export class NewBoneDialogComponent implements OnInit {

  boneType = 'fixed';

  boneName: string;

  fixedBone = new BoneFixedModel();

  constructor(private dialogRef: MatDialogRef<NewBoneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  saveBone(): void {
    let bone: BoneBaseModel;
    switch (this.boneType) {
      case BoneType.fixed:
        bone = this.fixedBone;
        break;
    }
    bone.name = this.boneName;
    this.dialogRef.close({data: bone});
  }

}

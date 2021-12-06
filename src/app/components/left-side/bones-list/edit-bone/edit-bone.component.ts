import { Component, Inject, OnInit } from '@angular/core';
import { BoneBaseModel } from '../BoneBaseModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../../../../utils/store.service';

@Component({
  selector: 'mfd-edit-bone',
  templateUrl: './edit-bone.component.html',
  styleUrls: ['./edit-bone.component.less']
})
export class EditBoneComponent implements OnInit {

  bone: BoneBaseModel;

  constructor(private dialogRef: MatDialogRef<EditBoneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { boneData: BoneBaseModel },
              private store: StoreService) {
    dialogRef.disableClose = true;
    this.bone = JSON.parse(JSON.stringify(data.boneData));
  }

  ngOnInit(): void {
  }

  saveBone(): void {
    this.dialogRef.close({data: this.bone});
  }
}


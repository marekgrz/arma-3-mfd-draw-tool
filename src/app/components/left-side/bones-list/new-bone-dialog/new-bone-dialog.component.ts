import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoneBaseModel, BoneFixedModel, BoneRotationalModel, BoneType } from '../BoneBaseModel';
import { StoreService } from '../../../../utils/store.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-bone-dialog',
  templateUrl: './new-bone-dialog.component.html',
  styleUrls: ['./new-bone-dialog.component.less']
})
export class NewBoneDialogComponent implements OnInit {

  boneType = 'fixed';

  fixedBone = new BoneFixedModel();

  rotationalBone = new BoneRotationalModel();

  nameFormControl: FormControl;

  constructor(private dialogRef: MatDialogRef<NewBoneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private store: StoreService) {
    dialogRef.disableClose = true;

    this.nameFormControl = new FormControl(this.getNextName(), [
      Validators.required,
      this.boneExistsValidator(),
    ]);
  }

  ngOnInit(): void {
  }

  getNextName(): string {
    const prefix = 'Bone_';
    let index = 1;
    while (this.store.bones.some(bone => bone.name === (prefix + index))) {
      index++;
    }
    return prefix + index;
  }

  saveBone(): void {
    let bone: BoneBaseModel;
    switch (this.boneType) {
      case BoneType.fixed:
        bone = this.fixedBone;
        break;
    }
    switch (this.boneType) {
      case BoneType.rotational:
        bone = this.rotationalBone;
        break;
    }
    bone.name = this.nameFormControl.value;
    this.dialogRef.close({data: bone});
  }

  boneExistsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const exists = this.store.bones.some(bone => bone.name.toLowerCase() === control.value.toLowerCase());
      return exists ? {exists: true} : null;
    };
  }
}

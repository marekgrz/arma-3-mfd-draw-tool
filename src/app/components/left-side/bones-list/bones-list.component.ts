import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../utils/store.service';
import { BoneBaseModel, BoneFixedModel, BoneLinearModel, BoneType } from './BoneBaseModel';
import { MatDialog } from '@angular/material/dialog';
import { NewBoneDialogComponent } from './new-bone-dialog/new-bone-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EditBoneComponent } from './edit-bone/edit-bone.component';

@Component({
  selector: 'app-bones-list',
  templateUrl: './bones-list.component.html',
  styleUrls: ['./bones-list.component.less']
})
export class BonesListComponent implements OnInit {

  constructor(public store: StoreService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  newBone(): void {
    const dialogRef = this.dialog.open(NewBoneDialogComponent, {});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.store.bones.push(result.data);
        }
      }
    );
  }

  editBone(bone: BoneBaseModel): void {
    const dialogRef = this.dialog.open(EditBoneComponent, {data: {boneData: bone}});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          // TODO Change to ID?
          const index = this.store.bones.findIndex(item => item.name === result.data.name);
          this.store.bones[index] = result.data;
        }
      }
    );
  }

  deleteBone(bone: BoneBaseModel): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: {message: 'Delete this bone?'}});
    confirmDialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.store.bones = this.store.bones.filter(el => el.name !== bone.name);
        }
      }
    );
  }

  getTypeIcon(boneType: BoneType): string {
    switch (boneType) {
      case BoneType.fixed:
        return 'fullscreen';
      case BoneType.linear:
        return 'linear_scale';
      case BoneType.rotational:
        return 'refresh';
    }
  }
}

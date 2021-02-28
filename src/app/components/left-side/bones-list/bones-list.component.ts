import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../utils/store.service';
import { BoneType } from './BoneBaseModel';
import { MatDialog } from '@angular/material/dialog';
import { NewBoneDialogComponent } from './new-bone-dialog/new-bone-dialog.component';

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
          console.log(result)
          this.store.bones.push(result.data);
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

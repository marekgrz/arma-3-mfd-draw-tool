import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {GlobalHUDProperties} from '../../../common/ProjectFileStructure';
import {StoreService} from '../../../utils/store.service';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.less']
})
export class NewProjectDialogComponent implements OnInit {

  FONT_LIST: string[] = [
    'EtelkaMonospacePro',
    'EtelkaMonospaceProBold',
    'EtelkaNarrowMediumPro',
    'LucidaConsoleB',
    'PuristaBold',
    'PuristaLight',
    'PuristaMedium',
    'PuristaSemiBold',
    'RobotoCondensed',
    'RobotoCondensedBold',
    'RobotoCondensedLight',
    'TahomaB',
  ];

  submitted = false;

  diffuseColor: FormControl;
  ambientColor: FormControl;
  emissiveColor: FormControl;

  requiredFields: FormGroup;

  globalHudProperties: GlobalHUDProperties;

  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>,
              private store: StoreService) {
    dialogRef.disableClose = true;
    this.globalHudProperties = new GlobalHUDProperties();
    this.diffuseColor = new FormControl(this.globalHudProperties.material.diffuse);
    this.ambientColor = new FormControl(this.globalHudProperties.material.ambient);
    this.emissiveColor = new FormControl(this.globalHudProperties.material.emissive);
    this.requiredFields = new FormGroup({
      name: new FormControl(this.globalHudProperties.name),
      topLeft: new FormControl(this.globalHudProperties.topLeft),
      topRight: new FormControl(this.globalHudProperties.topRight),
      bottomLeft: new FormControl(this.globalHudProperties.bottomLeft),
      bottomRight: new FormControl(this.globalHudProperties.bottomRight),
      screenWidth: new FormControl(this.globalHudProperties.screenWidth),
      screenHeight: new FormControl(this.globalHudProperties.screenHeight),
    });
  }

  get name(): AbstractControl {
    return this.requiredFields.get('name');
  }

  get topLeft(): AbstractControl {
    return this.requiredFields.get('topLeft');
  }

  get topRight(): AbstractControl {
    return this.requiredFields.get('topRight');
  }

  get bottomLeft(): AbstractControl {
    return this.requiredFields.get('bottomLeft');
  }

  get bottomRight(): AbstractControl {
    return this.requiredFields.get('bottomRight');
  }

  get screenWidth(): AbstractControl {
    return this.requiredFields.get('screenWidth');
  }

  get screenHeight(): AbstractControl {
    return this.requiredFields.get('screenHeight');
  }

  isFormValid(): boolean {
    return this.requiredFields.valid;
  }


  ngOnInit(): void {
  }

  save(): void {
    this.globalHudProperties.name = this.name.value;
    this.globalHudProperties.topLeft = this.topLeft.value;
    this.globalHudProperties.topRight = this.topRight.value;
    this.globalHudProperties.bottomLeft = this.bottomLeft.value;
    this.globalHudProperties.bottomRight = this.bottomRight.value;
    this.globalHudProperties.screenWidth = this.screenWidth.value;
    this.globalHudProperties.screenHeight = this.screenHeight.value;
    this.store.resetProject(this.globalHudProperties);
  }

  markFormGroupTouched(): void {
    (Object as any).values(this.requiredFields.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

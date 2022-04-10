import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GlobalHUDProperties } from '../../../../common/ProjectFileStructure';
import { StoreService } from '../../../../utils/store.service';

@Component({
  selector: 'mfd-project-settings-content',
  templateUrl: './project-settings-content.component.html',
  styleUrls: ['./project-settings-content.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectSettingsContentComponent {

  @Input()
  set properties(value: GlobalHUDProperties) {
    this.editMode = true;
    this.setupFormControls(value);
  }

  @Output()
  submitProperties: EventEmitter<GlobalHUDProperties> = new EventEmitter<GlobalHUDProperties>();

  submitted = false;
  editMode = false;

  diffuseColor: FormControl;
  ambientColor: FormControl;
  emissiveColor: FormControl;

  requiredFields: FormGroup;

  globalHudProperties: GlobalHUDProperties;

  constructor(public store: StoreService) {
    this.setupFormControls();
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

  startProject(): void {
    this.globalHudProperties.name = this.name.value;
    this.globalHudProperties.topLeft = this.topLeft.value;
    this.globalHudProperties.topRight = this.topRight.value;
    this.globalHudProperties.bottomLeft = this.bottomLeft.value;
    this.globalHudProperties.bottomRight = this.bottomRight.value;
    this.globalHudProperties.screenWidth = this.screenWidth.value;
    this.globalHudProperties.screenHeight = this.screenHeight.value;
    this.globalHudProperties.material.diffuse = this.diffuseColor.value;
    this.globalHudProperties.material.ambient = this.ambientColor.value;
    this.globalHudProperties.material.emissive = this.emissiveColor.value;
    this.submitProperties.emit(this.globalHudProperties);
  }

  markFormGroupTouched(): void {
    (Object as any).values(this.requiredFields.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private setupFormControls(properties = new GlobalHUDProperties()): void {
    this.globalHudProperties = properties;
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
}

import { Component } from '@angular/core';
import { StoreService } from '../../../../utils/store.service';
import { GlobalHUDProperties } from '../../../../common/ProjectFileStructure';

@Component({
  selector: 'mfd-project-settings-dialog-modify',
  templateUrl: './project-settings-dialog-modify.component.html',
  styleUrls: ['./project-settings-dialog-modify.component.less']
})
export class ProjectSettingsDialogModifyComponent {

  constructor(public store: StoreService) {
  }

  updateProperties(properties: GlobalHUDProperties): void {
    this.store.updateProject(properties);
  }
}

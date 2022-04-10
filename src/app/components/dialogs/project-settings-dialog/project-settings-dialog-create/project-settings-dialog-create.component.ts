import { Component } from '@angular/core';
import { StoreService } from '../../../../utils/store.service';
import { GlobalHUDProperties } from '../../../../common/ProjectFileStructure';

@Component({
  selector: 'mfd-project-settings-dialog-create',
  templateUrl: './project-settings-dialog-create.component.html',
  styleUrls: ['./project-settings-dialog-create.component.less']
})
export class ProjectSettingsDialogCreateComponent {

  constructor(private store: StoreService) {
  }

  startNewProject(properties: GlobalHUDProperties): void {
    this.store.startNewProject(properties);
  }
}

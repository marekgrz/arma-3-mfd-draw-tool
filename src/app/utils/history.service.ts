import { Injectable } from '@angular/core';
import { TreeService } from '../components/left-side/layer-stack-ng/tree.service';
import { StoreService } from './store.service';
import { CUSTOM_PROPERTIES, parseFileToProject, ProjectFileStructure } from '../common/ProjectFileStructure';
import * as CircularJSON from 'flatted';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private appSnapshotList: ProjectSnapshot[] = [];

  private snapShotVersion = 0;

  constructor(private treeService: TreeService,
              private store: StoreService) {
  }

  undo(): void {
    this.treeService.resetProjectStack();
    const previous = this.getPreviousSnapshot();
    parseFileToProject(CircularJSON.stringify(previous.projectData), this.treeService, this.store);
    this.treeService.validateNames();
    console.debug('Undo. Snapshots left ' + (this.appSnapshotList.length));
  }

  addSnapshot(): void {
    this.snapShotVersion++;
    const snapShot: ProjectSnapshot = {projectData: this.currentProjectData(), version: this.snapShotVersion};
    this.appSnapshotList.push(snapShot);
    this.treeService.validateNames();
    console.debug('Added snapshot. Current snapshots:  ' + (this.appSnapshotList.length));
  }

  snapshotsExist(): boolean {
    return this.appSnapshotList.length > 1;
  }

  private currentProjectData(): ProjectFileStructure {
    const projectData: ProjectFileStructure = new ProjectFileStructure();
    projectData.canvasContent = this.store.canvas.toJSON([...CUSTOM_PROPERTIES]);
    projectData.layerStackContent = this.treeService.itemList;
    projectData.globalHUDProperties = this.store.hudProperties;
    projectData.bones = this.store.bones;
    return CircularJSON.parse(CircularJSON.stringify(projectData));
  }

  private getPreviousSnapshot(): ProjectSnapshot {
    let previous: ProjectSnapshot;
    if (this.historyHasStartingPointOnly()) {
      previous = this.appSnapshotList[0];
    } else {
      previous = this.appSnapshotList.pop();
      if (previous.version === this.snapShotVersion) {
        previous = this.historyHasStartingPointOnly() ? this.appSnapshotList[0] : this.appSnapshotList.pop();
      }
    }
    return previous;
  }

  private historyHasStartingPointOnly(): boolean {
    return this.appSnapshotList.length < 2;
  }
}

interface ProjectSnapshot {
  projectData: ProjectFileStructure;
  version: number;
}

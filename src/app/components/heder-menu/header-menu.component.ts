import { Component, HostListener, OnInit } from '@angular/core';
import { TreeService } from '../left-side/layer-stack-ng/tree.service';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../utils/store.service';
import { parseFileToProject, parseProjectToFile } from '../../common/ProjectFileStructure';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../utils/local-storage.service';
import { HistoryService } from '../../utils/history.service';
import { ProjectSettingsDialogCreateComponent } from '../dialogs/project-settings-dialog/project-settings-dialog-create/project-settings-dialog-create.component';
import { ArmaFormatterService } from '../work-area/code-viewer/arma-formatter.service';
import 'neutralinojs-types';
import { FileSystemService, ProjectFileData } from '../../utils/backend/file-system.service';

@Component({
  selector: 'mfd-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {

  loading = false;

  constructor(public dialog: MatDialog,
              private treeService: TreeService,
              public store: StoreService,
              private snackBar: MatSnackBar,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService,
              public historyService: HistoryService,
              private armaFormatter: ArmaFormatterService,
              private fsService: FileSystemService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.reopenProject(), 1000);
  }

  @HostListener('window:keydown', ['$event'])
  async saveKey(e: KeyboardEvent): Promise<void> {
    if (e.key === 's' && e.ctrlKey) {
      await this.saveProject();
    }
  }

  @HostListener('window:keydown', ['$event'])
  undoKey(e: KeyboardEvent): void {
    if (e.key === 'z' && e.ctrlKey) {
      this.historyService.undo();
    }
  }

  newProject(): void {
    if (this.treeService.itemList.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {message: 'You have some unsaved changes. Continue?'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.startNewProject();
        }
      });
    } else {
      this.startNewProject();
    }
  }

  async openProject(): Promise<void> {
    this.loading = true;
    const project = await this.fsService.openProject();
    this.loading = false;
    this.loadProject(project);
  }

  async reopenProject(): Promise<void> {
    this.loading = true;
    const project = await this.fsService.reopenProject();
    if (project) {
      this.loadProject(project);
    } else  {
      this.startNewProject();
    }
    this.loading = false;
  }

  async saveProjectAs(): Promise<void> {
    this.loading = true;
    await this.fsService.saveProjectAs(parseProjectToFile(this.treeService, this.store));
    this.loading = false;
  }

  async saveProject(): Promise<void> {
    this.loading = true;
    await this.fsService.saveProject(parseProjectToFile(this.treeService, this.store));
    this.loading = false;
  }

  async exportToA3(): Promise<void> {
    this.loading = true;
    const data = await this.armaFormatter.getFormattedText().toPromise();
    await this.fsService.exportToA3(data);
    this.loading = false;
  }

  private showSnackBarInfo(): void {
    this.snackBar.open('Start new project or load existing one', undefined, {panelClass: 'custom-snackbar'});
  }

  private hideSnackBarInfo(): void {
    this.snackBar.dismiss();
  }

  private startNewProject(): void {
    this.hideSnackBarInfo();
    this.store.resetCanvas();
    this.treeService.resetProjectStack();
    this.fsService.newProject();
    const dialogRef = this.dialog.open(ProjectSettingsDialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      result ? this.hideSnackBarInfo() : this.showSnackBarInfo();
    });
    this.historyService.addSnapshot();
  }

  private loadProject(message: ProjectFileData): void {
    parseFileToProject(message.data, this.treeService, this.store);
    this.localStorageService.setLastLoadedProjectPath(message.filePath);
    this.historyService.addSnapshot();
    this.toastr.success('Project loaded');
    this.hideSnackBarInfo();
  }
}

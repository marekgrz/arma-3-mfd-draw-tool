import { Component, HostListener, OnInit } from '@angular/core';
import { IpcService } from '../../utils/ipc.service';
import { TreeService } from '../left-side/layer-stack-ng/tree.service';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../utils/store.service';
import { parseFileToProject, parseProjectToFile } from '../../common/ProjectFileStructure';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectDialogComponent } from '../dialogs/new-project-dialog/new-project-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../utils/local-storage.service';
import { HistoryService } from '../../utils/history.service';

@Component({
  selector: 'mfd-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {

  loading = false;

  constructor(public dialog: MatDialog,
              private ipc: IpcService,
              private treeService: TreeService,
              public store: StoreService,
              private snackBar: MatSnackBar,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService,
              public historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.setupFileHandling();
    // this.startNewProject();
    setTimeout(() => this.reopenProject(), 1000);
  }

  @HostListener('window:keydown', ['$event'])
  saveKey(e: KeyboardEvent): void {
    if (e.key === 's' && e.ctrlKey) {
      this.saveProjectAs();
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

  openProject(): void {
    this.ipc.send('openFile', '');
  }

  reopenProject(): void {
    const lastPath = this.localStorageService.getLastLoadedProjectPath();
    if (lastPath) {
      this.ipc.send('reopenLastFile', lastPath);
    }
  }

  saveProjectAs(): void {
    this.loading = true;
    this.ipc.send('saveFileAs', parseProjectToFile(this.treeService, this.store));
  }

  saveProject(): void {
    this.loading = true;
    this.ipc.send('saveFile', parseProjectToFile(this.treeService, this.store));
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
    this.ipc.send('new', '');
    const dialogRef = this.dialog.open(NewProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result ? this.hideSnackBarInfo() : this.showSnackBarInfo();
    });
    this.historyService.addSnapshot();
  }

  private setupFileHandling(): void {
    this.ipc.on('openFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
      parseFileToProject(message.data, this.treeService, this.store);
      this.localStorageService.setLastLoadedProjectPath(message.filePath);
      this.historyService.addSnapshot();
      this.toastr.success('Project loaded');
      this.hideSnackBarInfo();
    });
    this.ipc.on('saveFile', () => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
    this.ipc.on('saveFileAs', () => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
    this.ipc.on('reopenLastFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
      if (!!message) {
        parseFileToProject(message.data, this.treeService, this.store);
        this.localStorageService.setLastLoadedProjectPath(message.filePath);
        this.historyService.addSnapshot();
        this.toastr.success('Project loaded');
        this.hideSnackBarInfo();
      }
    });
  }
}

interface ProjectFileData {
  data: string;
  filePath: string;
}

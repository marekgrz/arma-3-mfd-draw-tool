import {Component, HostListener, OnInit} from '@angular/core';
import {IpcService} from '../../utils/ipc.service';
import {TreeService} from '../layer-stack/mat-tree/tree.service';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../utils/store.service';
import {parseProjectToFile, ProjectFileStructure} from '../../common/ProjectFileStructure';
import {MatDialog} from '@angular/material/dialog';
import {NewProjectDialogComponent} from '../dialogs/new-project-dialog/new-project-dialog.component';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {

  loading = false;

  constructor(public dialog: MatDialog,
              private ipc: IpcService,
              private treeService: TreeService,
              private store: StoreService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.ipc.on('openFile', (event: Electron.IpcMessageEvent, message) => {
      const savedProject: ProjectFileStructure = JSON.parse(message);
      console.log(savedProject)
      this.store.reloadProject(savedProject);
      this.treeService.itemList = savedProject.layerStackContent;
      this.treeService.refreshItemListFromCanvas(this.store.canvas);
      this.toastr.success('Project loaded');
    });
    this.ipc.on('saveFile', (event: Electron.IpcMessageEvent) => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
    this.ipc.on('saveFileAs', (event: Electron.IpcMessageEvent) => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
  }

  @HostListener('window:keydown', ['$event'])
  saveKey(e: KeyboardEvent): void {
    if (e.key === 's' && e.ctrlKey) {
      this.saveProjectAs();
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

  private startNewProject(): void {
    this.store.canvas.clear();
    this.treeService.itemList = [];
    this.ipc.send('new', '');
    const dialogRef = this.dialog.open(NewProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProject(): void {
    this.ipc.send('openFile', '');
  }

  saveProjectAs(): void {
    this.loading = true;
    this.ipc.send('saveFileAs', parseProjectToFile(this.treeService, this.store));
  }

  saveProject(): void {
    this.loading = true;
    this.ipc.send('saveFile', parseProjectToFile(this.treeService, this.store));
  }
}

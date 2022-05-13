import { Injectable } from '@angular/core';
import { IpcService } from '../ipc.service';
import { ProjectFileData } from './file-system.service';
import { AbstractFileSystemService } from './abstract-file-system-service';
import { PersistenceService } from '../persistence.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FileSystemElectronService extends AbstractFileSystemService {

  resolve: any;

  constructor(private ipc: IpcService,
              private persistenceService: PersistenceService,
              private toastr: ToastrService) {
    super();
    this.setupIpcOnEventListeners();
  }

  newProject(): void {
    this.ipc.send('new', '');
  }

  openProject(): Promise<ProjectFileData> {
    this.ipc.send('openFile', '');
    return new Promise<ProjectFileData>((resolve) => this.resolve = resolve);
  }

  async reopenProject(): Promise<ProjectFileData> {
    const lastPath = await this.persistenceService.getLastLoadedProjectPath();
    this.ipc.send('reopenLastFile', lastPath);
    return new Promise<ProjectFileData>((resolve) => this.resolve = resolve);
  }

  saveProject(data: string): Promise<boolean> {
    this.ipc.send('saveFile', data);
    return new Promise<boolean>((resolve) => this.resolve = resolve);
  }

  saveProjectAs(data: string): Promise<boolean> {
    this.ipc.send('saveFileAs', data);
    return new Promise<boolean>((resolve) => this.resolve = resolve);
  }

  exportToA3(data: string): Promise<boolean> {
    this.ipc.send('exportToA3', data);
    return new Promise<boolean>((resolve) => this.resolve = resolve);
  }

  private setupIpcOnEventListeners(): void {
    this.ipc.on('cancel', () => {
      this.resolve(null);
      console.log('Cancel saving');
    });
    this.ipc.on('error', () => {
      this.resolve(null);
      this.toastr.error('Error opening project');
    });
    this.ipc.on('openFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
      this.resolve(message);
    });
    this.ipc.on('reopenLastFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
      this.resolve(message);
    });
    this.ipc.on('saveFile', () => {
      this.resolve(true);
    });
    this.ipc.on('saveFileAs', () => this.resolve(true));
    this.ipc.on('fileExported', () => {
      this.resolve(true);
    });
  }
}

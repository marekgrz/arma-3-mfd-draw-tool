import { Injectable } from '@angular/core';
import { IpcService } from '../ipc.service';
import { ProjectFileData, TemplateData } from './file-system.service';
import { AbstractFileSystemService } from './abstract-file-system-service';
import { Observable } from 'rxjs';
import { PersistenceService } from '../persistence.service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemElectronService extends AbstractFileSystemService {

  constructor(private ipc: IpcService,
              private persistenceService: PersistenceService) {
    super();
  }

  newProject(): void {
    this.ipc.send('new', '');
  }

  openProject(): Promise<ProjectFileData> {
    this.ipc.send('openFile', '');
    return new Promise<ProjectFileData>((resolve) => {
      this.ipc.on('openFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
        resolve(message);
      });
    });
  }

  async reopenProject(): Promise<ProjectFileData> {
    const lastPath = await this.persistenceService.getLastLoadedProjectPath();
    this.ipc.send('reopenLastFile', lastPath);
    return new Promise<ProjectFileData>((resolve) => {
      this.ipc.on('reopenLastFile', (event: Electron.IpcMessageEvent, message: ProjectFileData) => {
        resolve(message);
      });
    });
  }

  saveProject(data: string): Promise<void> {
    this.ipc.send('saveFile', '');
    return new Promise<void>((resolve) => {
      this.ipc.on('saveFile', () => {
        resolve();
      });
    });
  }

  saveProjectAs(data: string): Promise<void> {
    this.ipc.send('saveFileAs', '');
    return new Promise<void>((resolve) => {
      this.ipc.on('saveFileAs', () => {
        resolve();
      });
    });
  }

  exportToA3(data: string): Promise<void> {
    this.ipc.send('exportToA3', data);
    return new Promise<void>((resolve) => {
      this.ipc.on('fileExported', () => {
        resolve();
      });
    });
  }

  fetchMustacheTemplates(): Observable<TemplateData[]> {
    this.ipc.send('loadTemplates', '');
    return new Observable<TemplateData[]>(observer => {
      this.ipc.on('loadTemplates', (event: Electron.IpcMessageEvent, message: TemplateData[]) => {
        observer.next(message);
        observer.complete();
      });
    });
  }
}

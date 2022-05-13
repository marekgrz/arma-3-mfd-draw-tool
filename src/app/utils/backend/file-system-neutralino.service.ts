import { Injectable } from '@angular/core';
import 'neutralinojs-types';
import chalk from 'chalk';
import { PersistenceService } from '../persistence.service';
import { ProjectFileData } from './file-system.service';
import { AbstractFileSystemService } from './abstract-file-system-service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemNeutralinoService extends AbstractFileSystemService {

  private saveFilePath: string;

  constructor(private persistenceService: PersistenceService) {
    super();
  }

  newProject(): void {
    this.saveFilePath = undefined;
  }

  async openProject(): Promise<ProjectFileData> {
    // @ts-ignore (incorrect type, TS shows 'filter' and should be 'filters')
    const paths = await Neutralino.os.showOpenDialog('Open project', {filters: [{name: 'A3 MFD drawer file', extensions: ['a3mfd']}]});
    if (paths.length && paths[0]) {
      const data = await Neutralino.filesystem.readFile(paths[0]);
      return {data, filePath: paths[0]} as ProjectFileData;
    }
  }

  async reopenProject(): Promise<ProjectFileData> {
    const path = await this.persistenceService.getLastLoadedProjectPath();
    if (!path) {
      return undefined;
    }
    const data = await Neutralino.filesystem.readFile(path);
    this.saveFilePath = path;
    return {data, filePath: path} as ProjectFileData;
  }

  async saveProject(data: string): Promise<boolean> {
    if (this.saveFilePath) {
      return await this.saveFileToDir(this.saveFilePath, data);
    } else {
      return await this.showSaveDialog(data, 'Save project to', 'A3 MFD drawer file', 'a3mfd');
    }
  }

  async saveProjectAs(data: string): Promise<boolean> {
    return await this.showSaveDialog(data, 'Save project to', 'A3 MFD drawer file', 'a3mfd');
  }

  async exportToA3(data: string): Promise<boolean> {
    return await this.showSaveDialog(data, 'Export to', 'A3 Class file', 'hpp');
  }

  private async showSaveDialog(content: string, title: string, fileExtensionName: string, extension: string): Promise<boolean> {
    // @ts-ignore (incorrect type, TS shows 'filter' and should be 'filters')
    const savePath = await Neutralino.os.showSaveDialog(title, {filters: [{name: fileExtensionName, extensions: [extension]}]});
    if (savePath) {
      this.saveFilePath = savePath;
      return await this.saveFileToDir(savePath, content);
    } else {
      console.log(chalk.red('File save cancelled'));
      return false;
    }
  }

  private async saveFileToDir(filePath: string, content: string): Promise<boolean> {
    await Neutralino.filesystem.writeFile(filePath, content);
    console.log(chalk.green('File saved'));
    return true;
  }
}
import { Injectable } from '@angular/core';
import 'neutralinojs-types';
import chalk from 'chalk';
import { LocalStorageService } from '../local-storage.service';
import { Observable } from 'rxjs';
import { ProjectFileData, TemplateData } from './file-system.service';
import { AbstractFileSystemService } from './abstract-file-system-service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemNeutralinoService extends AbstractFileSystemService {

  private saveFilePath: string;

  constructor(private localStorageService: LocalStorageService) {
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
    const path = this.localStorageService.getLastLoadedProjectPath();
    const data = await Neutralino.filesystem.readFile(path);
    this.saveFilePath = path;
    return {data, filePath: path} as ProjectFileData;
  }

  async saveProject(data: string): Promise<void> {
    if (this.saveFilePath) {
      await this.saveFileToDir(this.saveFilePath, data);
    } else {
      await this.showSaveDialog(data, 'Save project to', 'A3 MFD drawer file', 'a3mfd');
    }
  }

  async saveProjectAs(data: string): Promise<void> {
    await this.showSaveDialog(data, 'Save project to', 'A3 MFD drawer file', 'a3mfd');
  }

  async exportToA3(data: string): Promise<void> {
    await this.showSaveDialog(data, 'Export to', 'A3 Class file', 'hpp');
  }

  fetchMustacheTemplates(): Observable<TemplateData[]> {
    const templatesPath = './src/assets/templates';
    return new Observable<TemplateData[]>(observer => {
      Neutralino.filesystem.readDirectory(templatesPath).then(entries => {
        const fileEntries = entries.filter(file => file.type === 'FILE');
        const fileOpenPromises = fileEntries
          .map(fileName => Neutralino.filesystem.readFile(`${templatesPath}/${fileName.entry}`));
        Promise.all(fileOpenPromises).then((files) => {
          const templateData = files.map((file, index) => new TemplateData(fileEntries[index].entry.replace('.mustache', ''), file));
          observer.next(templateData);
          observer.complete();
        });
      });
    });
  }

  private async showSaveDialog(content: string, title: string, fileExtensionName: string, extension: string): Promise<void> {
    // @ts-ignore (incorrect type, TS shows 'filter' and should be 'filters')
    const savePath = await Neutralino.os.showSaveDialog(title, {filters: [{name: fileExtensionName, extensions: [extension]}]});
    if (savePath) {
      this.saveFilePath = savePath;
      await this.saveFileToDir(savePath, content);
    } else {
      console.log(chalk.red('File save cancelled'));
    }
  }

  private async saveFileToDir(filePath: string, content: string): Promise<void> {
    await Neutralino.filesystem.writeFile(filePath, content);
    console.log(chalk.green('File saved'));
  }
}
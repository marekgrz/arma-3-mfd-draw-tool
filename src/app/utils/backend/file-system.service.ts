import { Injectable } from '@angular/core';
import { AbstractFileSystemService } from './abstract-file-system-service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private fs: AbstractFileSystemService) {
  }

  newProject(): void {
    this.fs.newProject();
  }

  async openProject(): Promise<ProjectFileData> {
    return this.fs.openProject();
  }

  async reopenProject(): Promise<ProjectFileData> {
    return this.fs.reopenProject();
  }

  async saveProject(data: string): Promise<boolean> {
    return this.fs.saveProject(data);
  }

  async saveProjectAs(data: string): Promise<boolean> {
    return this.fs.saveProjectAs(data);
  }

  async exportToA3(data: string): Promise<boolean> {
    return await this.fs.exportToA3(data);
  }
}

export interface ProjectFileData {
  data: string;
  filePath: string;
}

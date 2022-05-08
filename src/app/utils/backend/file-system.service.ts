import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  async saveProject(data: string): Promise<void> {
    return this.fs.saveProject(data);
  }

  async saveProjectAs(data: string): Promise<void> {
    return this.fs.saveProjectAs(data);
  }

  async exportToA3(data: string): Promise<void> {
    await this.fs.exportToA3(data);
  }

  fetchMustacheTemplates(): Observable<TemplateData[]> {
    return this.fs.fetchMustacheTemplates();
  }
}

export interface ProjectFileData {
  data: string;
  filePath: string;
}

export class TemplateData {
  name;
  template;

  constructor(name, template) {
    this.name = name;
    this.template = template;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractFileSystemService } from './abstract-file-system-service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private fsNeutralino: AbstractFileSystemService) {
  }

  newProject(): void {
    this.fsNeutralino.newProject();
  }

  async openProject(): Promise<ProjectFileData> {
    return this.fsNeutralino.openProject();
  }

  async reopenProject(): Promise<ProjectFileData> {
    return this.fsNeutralino.reopenProject();
  }

  async saveProject(data: string): Promise<void> {
    return this.fsNeutralino.saveProject(data);
  }

  async saveProjectAs(data: string): Promise<void> {
    return this.fsNeutralino.saveProjectAs(data);
  }

  async exportToA3(data: string): Promise<void> {
    await this.fsNeutralino.exportToA3(data);
  }

  fetchMustacheTemplates(): Observable<TemplateData[]> {
    return this.fsNeutralino.fetchMustacheTemplates();
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

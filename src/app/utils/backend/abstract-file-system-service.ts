import { ProjectFileData, TemplateData } from './file-system.service';
import { Observable } from 'rxjs';

export abstract class AbstractFileSystemService {

  abstract newProject(): void;

  abstract openProject(): Promise<ProjectFileData>;

  abstract reopenProject(): Promise<ProjectFileData>;

  abstract saveProject(data: string): Promise<void>;

  abstract saveProjectAs(data: string): Promise<void>;

  abstract exportToA3(data: string): Promise<void>;

  abstract fetchMustacheTemplates(): Observable<TemplateData[]>;
}

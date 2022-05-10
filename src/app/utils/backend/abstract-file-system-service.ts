import { ProjectFileData } from './file-system.service';

export abstract class AbstractFileSystemService {

  abstract newProject(): void;

  abstract openProject(): Promise<ProjectFileData>;

  abstract reopenProject(): Promise<ProjectFileData>;

  abstract saveProject(data: string): Promise<void>;

  abstract saveProjectAs(data: string): Promise<void>;

  abstract exportToA3(data: string): Promise<void>;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setLastLoadedProjectPath(path: string): void {
    localStorage.setItem(LOCAL_STORAGE_MAP.lastProjectPath, path);
  }

  getLastLoadedProjectPath(): string {
    return localStorage.getItem(LOCAL_STORAGE_MAP.lastProjectPath);
  }
}

export const LOCAL_STORAGE_MAP = {
  lastProjectPath: 'LAST_PROJECT',
};


import { Injectable } from '@angular/core';
import 'neutralinojs-types';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() {
  }

  async setLastLoadedProjectPath(path: string): Promise<void> {
      localStorage.setItem(LOCAL_STORAGE_MAP.lastProjectPath, path);
  }

  async getLastLoadedProjectPath(): Promise<string> {
      return new Promise((resolve) => resolve(localStorage.getItem(LOCAL_STORAGE_MAP.lastProjectPath)));
  }

  async setPanelSize(panel: string, size: number): Promise<void> {
      localStorage.setItem(`panel_${panel}_size`, size.toString());
  }

  async getPanelSize(panel: string): Promise<string> {
      return new Promise((resolve) => resolve(localStorage.getItem(`panel_${panel}_size`)));
  }
}

export const LOCAL_STORAGE_MAP = {
  lastProjectPath: 'LAST_PROJECT',
};


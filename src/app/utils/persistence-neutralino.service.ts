import { Injectable } from '@angular/core';
import 'neutralinojs-types';
import { LOCAL_STORAGE_MAP, PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class PersistenceNeutralinoService extends PersistenceService{

  async setLastLoadedProjectPath(path: string): Promise<void> {
      await Neutralino.storage.setData(LOCAL_STORAGE_MAP.lastProjectPath, path);
  }

  async getLastLoadedProjectPath(): Promise<string> {
    try {
      return await Neutralino.storage.getData(LOCAL_STORAGE_MAP.lastProjectPath);
    } catch (e) {
      return undefined;
    }
  }

  async setPanelSize(panel: string, size: number): Promise<void> {
      await Neutralino.storage.setData(`panel_${panel}_size`, size.toString());
  }

  async getPanelSize(panel: string): Promise<string> {
    try {
      return await Neutralino.storage.getData(`panel_${panel}_size`);
    } catch (e) {
      return undefined;
    }
  }
}

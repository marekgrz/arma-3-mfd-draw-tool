import {StackItem} from '../components/layer-stack/elements/StackItem';
import {Color} from '@angular-material-components/color-picker';
import {TreeService} from '../components/layer-stack/mat-tree/tree.service';
import {StoreService} from '../utils/store.service';

export class ProjectFileStructure {
  canvasContent: string;
  layerStackContent: StackItem[];
  globalHUDProperties: GlobalHUDProperties;
  bones: any;
}

export function parseProjectToFile(treeService: TreeService, store: StoreService): string {
  const project: ProjectFileStructure = new ProjectFileStructure();
  project.canvasContent = store.canvas.toJSON(['id', 'points']);
  project.layerStackContent = treeService.itemList;
  project.globalHUDProperties = store.hudProperties;
  return JSON.stringify(project);
}

export function encode(content: string): string {
  return btoa(content);
}

export function decode(content: string): string {
  return atob(content);
}

export class GlobalHUDProperties {
  name: string;
  color: Color;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  borderLeft = 0;
  borderRight = 0;
  borderTop = 0;
  borderBottom = 0;
  fontHelicopterHUD = 'RobotoCondensed';
  font = 'RobotoCondensed';
  helmetMountedDisplay = false;
  material: {
    ambient: Color,
    diffuse: Color,
    emissive: Color,
  } = {
    ambient: new Color(128, 128, 128, 1),
    diffuse: new Color(255, 255, 255, 1),
    emissive: new Color(128, 128, 128, 1)
  };
  // additional
  screenWidth: number;
  screenHeight: number;
}

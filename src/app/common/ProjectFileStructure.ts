import {StackItem} from '../components/left-side/layer-stack/elements/StackItem';
import {Color} from '@angular-material-components/color-picker';
import {TreeService} from '../components/left-side/layer-stack/mat-tree/tree.service';
import {StoreService} from '../utils/store.service';
import { BoneBaseModel } from '../components/left-side/bones-list/BoneBaseModel';

export class ProjectFileStructure {
  canvasContent: string;
  layerStackContent: StackItem[];
  globalHUDProperties: GlobalHUDProperties;
  bones: BoneBaseModel[];
}

export function parseProjectToFile(treeService: TreeService, store: StoreService): string {
  const project: ProjectFileStructure = new ProjectFileStructure();
  project.canvasContent = store.canvas.toJSON([ID, POINTS, CIRCLESTEP, LINETYPE]);
  project.layerStackContent = treeService.itemList;
  project.globalHUDProperties = store.hudProperties;
  project.bones = store.bones;
  return JSON.stringify(project);
}

export function parseFileToProject(message: string, treeService: TreeService, store: StoreService): void {
  const savedProject: ProjectFileStructure = JSON.parse(message);
  treeService.itemList = savedProject.layerStackContent;
  store.reloadProject(savedProject);
  treeService.refreshItemListFromCanvas(store.canvas);
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

///// CUSTOM PROPERTIES /////////////
///// DEINE THEM IN THE PARSE FUNCTION ABOVE ////////////
export const ID = 'id';
export const POINTS = 'points';
export const CIRCLESTEP = 'circleStep';
export const LINETYPE = 'lineType';


import { StackItem } from '../components/left-side/layer-stack-ng/elements/StackItem';
import { Color } from '@angular-material-components/color-picker';
import { TreeService } from '../components/left-side/layer-stack-ng/tree.service';
import { StoreService } from '../utils/store.service';
import { BoneBaseModel } from '../components/left-side/bones-list/BoneBaseModel';
import * as CircularJSON from 'flatted';

export class ProjectFileStructure {
  canvasContent: string;
  layerStackContent: StackItem[];
  globalHUDProperties: GlobalHUDProperties;
  bones: BoneBaseModel[];
}

export function parseProjectToFile(treeService: TreeService, store: StoreService): string {
  const project: ProjectFileStructure = new ProjectFileStructure();
  project.canvasContent = store.canvas.toJSON([...CUSTOM_PROPERTIES]);
  project.layerStackContent = treeService.itemList;
  project.globalHUDProperties = store.hudProperties;
  project.bones = store.bones;
  return CircularJSON.stringify(project);
}

export function parseFileToProject(message: string, treeService: TreeService, store: StoreService): void {
  const savedProject: ProjectFileStructure = CircularJSON.parse(message);
  // const savedProject: ProjectFileStructure = JSON.parse(message);
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
    ambient: string,
    diffuse: string,
    emissive: string,
  } = {
    ambient: '#000000',
    diffuse: '#000000',
    emissive: '#000000',
  };
  // additional
  screenWidth = 1024;
  screenHeight = 1024;
}


// TODO Change to MetaData object type
///// CUSTOM PROPERTIES /////////////
///// DEFINE THEM IN THE PARSE FUNCTION ABOVE ////////////
export const ID = 'id';
export const POINTS = 'points';
export const CIRCLE_STEP = 'circleStep';
export const LINE_TYPE = 'lineType';
export const BONE_NAME = 'boneName';
export const LOCK_ORIENTATION = 'lockRotation';
export const PREVIOUS_ANGLE = 'previousAngle';
export const CURRENT_ANGLE = 'currentAngle';
export const SOURCE = 'source';
export const SOURCE_SCALE = 'sourceScale';

export const CUSTOM_PROPERTIES = [ID, POINTS, CIRCLE_STEP, LINE_TYPE, BONE_NAME, LOCK_ORIENTATION, CURRENT_ANGLE, PREVIOUS_ANGLE, SOURCE, SOURCE_SCALE];


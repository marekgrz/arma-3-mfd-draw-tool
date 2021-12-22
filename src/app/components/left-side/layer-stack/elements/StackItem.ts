import { Point } from '../../../../common/Point';
import { TextureFile } from '../../../right-side/toolbox/properties/element-types/texture-properties/texture-file-selector/texture-file-selector.component';
import { TreeNode } from 'primeng/api';

export class StackItem implements TreeNode {
  id: string = generateId();
  label: string;
  itemType: ItemType;
  base: BaseProperties = new BaseProperties();
  data?: any;
  children = [];
  groupProperties: GroupProperties = new GroupProperties();
  bone: string;
  icon = 'pi pi-directions';
  droppable = false;
  expandedIcon?: string;
  collapsedIcon?: string;
  textureFile?: TextureFile = new TextureFile();
  layerVisible = true;
  type = 'treeNode';
  styleClass: string;
  leaf = true;
  // parent?: StackItem;
}

export class GroupProperties {
  condition?: string;
  blinking = false;
  blinkingPattern?: string;
  blinkingStartsOn?: number;
  clipTL: Point = new Point();
  clipBR: Point = new Point();
  clipTLParallax: Point = new Point();
  clipBRParallax: Point = new Point();
}

export class BaseProperties {
  position: Point = new Point();
}

export enum ItemType {
  root = 'root',
  group = 'group',
  line = 'line',
  rectangle = 'rectangle',
  circle = 'circle',
  triangle = 'triangle',
  polygonRect = 'polygonRect',
  polygonTriangle = 'polygonTriangle',
  texture = 'texture',
  text = 'text'
}

export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

import { Point } from '../../../../common/Point';
import { TextureFile } from '../../../right-side/toolbox/properties/element-types/texture-properties/texture-file-selector/texture-file-selector.component';

export class StackItem {
  id: string = generateId();
  name: string;
  type: ItemType;
  base: BaseProperties = new BaseProperties();
  element?: any;
  children = new Array<StackItem>();
  groupProperties: GroupProperties = new GroupProperties();
  bone: string;
  textureFile?: TextureFile = new TextureFile();
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
  root,
  group,
  line,
  rectangle,
  circle,
  triangle,
  polygonRect,
  polygonTriangle,
  texture,
  text
}

export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

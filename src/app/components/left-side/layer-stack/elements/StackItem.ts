import { Point } from '../../../../common/Point';

export class StackItem {
  id: string = generateId();
  name: string;
  type: ElementType;
  element?: any;
  children = new Array<StackItem>();
  parent?: StackItem;
  groupCondition?: string;
  groupBlinking = false;
  groupBlinkingPattern?: string;
  groupBlinkingStartsOn?: number;
  clipTL: Point = new Point();
  clipBR: Point = new Point();
  clipTLParallax: Point = new Point();
  clipBRParallax: Point = new Point();
}

export enum ElementType {
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

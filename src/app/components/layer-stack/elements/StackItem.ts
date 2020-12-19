import {BaseElement} from './BaseElement';

export class StackItem {
  id: string = generateId();
  name: string;
  type: ElementType;
  element?: any;
  children = new Array<StackItem>();
}

export enum ElementType {
  root,
  group,
  line,
  rectangle,
  circle,
}

export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

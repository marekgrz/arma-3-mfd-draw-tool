export class StackItem {
  id: string = generateId();
  name: string;
  type: ElementType;
  children = new Array<StackItem>();
}

export enum ElementType {
  container,
  line,
  rectangle,
  circle,
}

export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

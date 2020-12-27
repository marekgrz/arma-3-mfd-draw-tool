import {Color} from './Color';
import {StackItem} from '../components/layer-stack/elements/StackItem';

export function getBoneIfExists(bone: string): string {
  return bone && bone.length > 0 ? bone + ', ' : '';
}

export function getCondition(condition: string): string {
  if (!condition) {
    return '';
  }
  return `condition = "${condition}";`;
}


export function getColorArray(color: Color): string {
  if (!color) {
    return '';
  }
  return `color[] = { ${color.r}, ${color.g}, ${color.b}, ${color.a} };`;
}

export function findByID(id: string, items: StackItem[]): StackItem {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const result = this.findByID(id, item.children);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

export function deleteElementById(node: StackItem, id): void {
  if (node.children) {
    node.children.forEach(it => this.deleteElementById(it, id));
    node.children = node.children.filter(it => it.id !== id);
  }
}

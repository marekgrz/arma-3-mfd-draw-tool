import {StackItem} from '../components/layer-stack/elements/StackItem';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';

export function getBoneIfExists(bone: string): string {
  return bone && bone.length > 0 ? bone + ', ' : '';
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
      const result = findByID(id, item.children);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

export function flattenList(nodes: StackItem[]): StackItem[] {
  const items: StackItem[] = [];

  function flatChildren(children): void {
    children.forEach(item => {
      items.push(item);
      if (item.children) {
        flatChildren(item.children);
      }
    });
  }

  flatChildren(nodes);
  return items;
}

export function flattenNode(node: StackItem): fabric.Object[] {
  if (!node.children) {
    if (!node.element) {
      return [];
    }
    return [node.element];
  }
  let elements = [];
  node.children.map(item => {
      if (item.children) {
        elements = [...elements, ...flattenNode(item)];
      }
      if (item.element) {
        elements.push(item.element);
      }
    }
  );
  return elements;
}

export function deleteElementById(node: StackItem, id): void {
  if (node.children) {
    node.children.forEach(it => deleteElementById(it, id));
    node.children = node.children.filter(it => it.id !== id);
  }
}

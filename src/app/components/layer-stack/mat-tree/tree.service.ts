import {Injectable} from '@angular/core';
import {ElementType, StackItem} from '../elements/StackItem';
import {Line, Rect} from 'fabric/fabric-impl';
import {fabric} from 'fabric';
import {StoreService} from '../../../utils/store.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  selectedItem: StackItem;

  itemList: StackItem[] = [];

  private rectangleIndex = 1;
  private lineIndex = 1;
  private groupIndex = 1;

  constructor(public store: StoreService) {
  }

  itemFromLine(line: Line): StackItem {
    const item = new StackItem();
    item.id = line['id'];
    item.name = 'Line_' + this.lineIndex++;
    item.type = ElementType.line;
    item.element = line;
    item.children = null;
    return item;
  }

  itemFromRectangle(rectangle: Rect): StackItem {
    const item = new StackItem();
    item.id = rectangle['id'];
    item.name = 'Rectangle_' + this.rectangleIndex++;
    item.type = ElementType.rectangle;
    item.element = rectangle;
    item.children = null;
    return item;
  }

  createGroup(): void {
    if (this.selectedItem && this.selectedItem.type !== ElementType.root) {
      this.wrapItemsInGroup();
    } else {
      this.itemList.push(this.newGroup());
    }
    this.groupIndex++;
  }

  deleteById(id: string): void {
    this.itemList.forEach(it => this.deleteElementById(it, id));
    this.itemList = this.itemList.filter(it => it.id !== id);
  }

  selectItemInCanvas(): void {
    const elementListOriginal = this.flatten(this.selectedItem);
    const selection = new fabric.ActiveSelection(elementListOriginal, {canvas: this.store.canvas});
    this.store.canvas.discardActiveObject();
    this.store.canvas.setActiveObject(selection);
    this.store.canvas.requestRenderAll();
  }

  selectItemInLayerList(ids: string[]): void {
    if (ids.length < 2) {
      this.selectedItem = this.findElementById(this.itemList, ids[0]);
    }
    this.deselectCurrentItems();
    ids.forEach(id => {
      const element = document.getElementById(id);
      element.classList.add('selected-item');
    });
  }

  deselectCurrentItems(): void {
    this.selectedItem = null;
    const elements = document.querySelectorAll('.selected-item, .selected-root');
    elements.forEach(el => {
      el.classList.remove('selected-item');
      el.classList.remove('selected-root');
    });
  }

  private newGroup(): StackItem {
    const group = new StackItem();
    group.name = 'Group_' + this.groupIndex;
    group.type = ElementType.group;
    group.element = undefined;
    return group;
  }

  private wrapItemsInGroup(): StackItem {
    const group = this.newGroup();
    const children = [Object.assign({}, this.selectedItem)];
    this.selectedItem.name = group.name;
    this.selectedItem.id = group.id;
    this.selectedItem.element = group.element;
    this.selectedItem.type = group.type;
    this.selectedItem.children = children;
    return group;
  }

  private findElementById(nodes, id, callback?): StackItem {
    let res;
    const findNode = (nodes, id) => {
      for (const item of nodes) {
        if (item.id === id) {
          res = item;
          break;
        }
        if (item.nextItems) {
          findNode(item.nextItems, id);
        }
      }
    };
    findNode(nodes, id);
    return res;
  }

  private deleteElementById(node: StackItem, id): void {
    if (node.children) {
      node.children.forEach(it => this.deleteElementById(it, id));
      node.children = node.children.filter(it => it.id !== id);
    }
  }

  private flatten(node: StackItem): fabric.Object[] {
    if (!node.children) {
      if (!node.element) {
        return [];
      }
      return [node.element];
    }
    let elements = [];
    node.children.map(item => {
        if (item.children) {
          elements = [...elements, ...this.flatten(item)];
        }
        if (item.element) {
          elements.push(item.element);
        }
      }
    );
    return elements;
  }
}

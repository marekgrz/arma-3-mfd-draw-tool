import {Injectable} from '@angular/core';
import {ElementType, generateId, StackItem} from '../elements/StackItem';
import {Line} from 'fabric/fabric-impl';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  selectedItem: StackItem;

  itemList: StackItem[];


  constructor() {
  }

  itemFromLine(line: Line): StackItem {
    const item = new StackItem();
    item.id = generateId();
    item.type = ElementType.line;
    item.element = line;
    item.children = [];
    return item;
  }

  setSelectedItem(item: StackItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): StackItem {
    return this.selectedItem;
  }
}

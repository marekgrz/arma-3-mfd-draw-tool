import {Injectable} from '@angular/core';
import {StackItem} from '../elements/StackItem';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  selectedItem: StackItem;

  constructor() {
  }

  setSelectedItem(item: StackItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): StackItem {
    return this.selectedItem;
  }
}

import {Injectable} from '@angular/core';
import {TreeService} from './tree.service';
import {StackItem} from '../elements/StackItem';
import {fabric} from 'fabric';
import {StoreService} from '../../../utils/store.service';
import {findByID} from '../../../common/Utils';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private treeService: TreeService,
              private store: StoreService) {}

  onItemInLayerStackSelected(item: StackItem): void {
    this.store.canvas.discardActiveObject();
    const elementListOriginal = this.flatten(item);
    const selection = new fabric.ActiveSelection(elementListOriginal, {canvas: this.store.canvas});
    this.treeService.selectedItem = item;
    this.store.canvas.setActiveObject(selection);
    this.store.canvas.requestRenderAll();
  }

  onItemInCanvasSelected(ids: string[]): void {
    // //this.deselectCurrentItems();
    // if (ids.length < 2) {
    //   //this.treeService.selectedItem = findByID(ids[0], this.treeService.itemList);
    // }
    // ids.forEach(id => {
    //   const element = document.getElementById(id);
    //   element.classList.add('selected-item');
    // });
  }

  deselectCurrentItems(): void {
    this.treeService.selectedItem = null;
    const elements = document.querySelectorAll('.selected-item, .selected-root');
    elements.forEach(el => {
      el.classList.remove('selected-item');
      el.classList.remove('selected-root');
    });
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

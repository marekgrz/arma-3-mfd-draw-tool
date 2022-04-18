import { Injectable } from '@angular/core';
import { TreeService } from './tree.service';
import { generateId, generateLabelCopy, ItemType, StackItem } from './elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../utils/store.service';
import { findByID, flattenNode } from '../../../common/Utils';
import { MatDialog } from '@angular/material/dialog';
import { BONENAME, CIRCLESTEP, ID, LINETYPE, LOCKORIENTATION, POINTS } from '../../../common/ProjectFileStructure';
import { HistoryService } from '../../../utils/history.service';
import * as CircularJSON from 'flatted';
import { ElementTransformService } from '../../right-side/toolbox/properties/element-types/element-transform.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private drawingMode = false;

  constructor(private treeService: TreeService,
              private store: StoreService,
              private dialog: MatDialog,
              private historyService: HistoryService,
              private elementTransform: ElementTransformService) {
  }

  refreshView(skipSnapshot: boolean = false): void {
    this.store.canvas.requestRenderAll();
    if (!skipSnapshot) {
      this.historyService.addSnapshot();
    }
  }

  startFreeDrawing(): void {
    this.drawingMode = true;
  }

  stopFreeDrawing(): void {
    this.drawingMode = false;
  }

  deselectCurrentItems(): void {
    this.treeService.clearSelection();
    this.store.canvas.discardActiveObject();
  }

  onItemInLayerStackSelected(item: StackItem): void {
    this.store.canvas.discardActiveObject();
    let selection;
    if (item.itemType === ItemType.group) {
      const elementListOriginal = flattenNode(item);
      selection = new fabric.ActiveSelection(elementListOriginal, {canvas: this.store.canvas});
    } else {
      selection = this.store.canvas.getObjects().find(element => element[ID] === item.id);
    }
    // this.treeService.selectedItem = item;
    this.store.canvas.setActiveObject(selection);
    this.store.canvas.requestRenderAll();
  }

  onItemInCanvasSelected(ids: string[]): void {
    if (this.treeService.selectedItem && this.treeService.selectedItem.itemType === ItemType.group) {
      return;
    }
    if (!this.drawingMode) {
      this.treeService.clearSelection();
      if (ids.length < 2) {
        this.treeService.setSelectedItem(findByID(ids[0], this.treeService.itemList));
      }
      // ids.forEach(id => {
      //   const element = document.getElementById(id);
      //   element.classList.add('selected-item');
      // });
    }
    this.store.canvas.requestRenderAll();
  }

  onDeleteSelection(): void {
    this.store.canvas.getActiveObjects().forEach(it => {
      this.store.canvas.remove(it);
      this.treeService.deleteItemByID(it[ID]);
    });
    if (this.treeService.selectedItem && this.treeService.selectedItem.itemType === ItemType.group) {
      this.treeService.deleteItemByID(this.treeService.selectedItem.id);
    }
    this.store.canvas.discardActiveObject();
    this.refreshView();
  }

  onDeleteById(itemId): void {
    this.store.canvas.remove(this.store.canvas.getObjects().find(it => it[ID] === itemId));
    this.treeService.deleteItemByID(itemId);
    this.refreshView();
  }

  onDuplicateSelection(): void {
    this.onDuplicateItem(this.treeService.selectedItem);
  }

  onDuplicateItem(item: StackItem): void {
    const selectionCopy = this.cloneSelection(item);
    if (item.parent) {
      const index = item.parent.children.findIndex(it => it.id === item.id) + 1;
      item.parent.children.splice(index, 0, selectionCopy);
    } else {
      const index = this.treeService.itemList.findIndex(it => it.id === item.id) + 1;
      this.treeService.itemList.splice(index, 0, selectionCopy);
    }
    this.refreshView();
  }

  private cloneSelection(item: StackItem): StackItem {
    const itemCopy: StackItem = CircularJSON.parse(CircularJSON.stringify(item));
    const newId = generateId();
    itemCopy.id = newId;
    itemCopy.label = generateLabelCopy(item, this.treeService.itemList);
    if (item.data) {
      item.data.clone((clone) => {
        itemCopy.data = clone;
        itemCopy.data[ID] = newId;
        this.elementTransform.setElementPosition(clone, itemCopy, itemCopy.bone);
        this.store.canvas.add(clone);
      }, [POINTS, CIRCLESTEP, LINETYPE, BONENAME, LOCKORIENTATION]);
    }
    if (item.children) {
      itemCopy.children = item.children.map(child => this.cloneSelection(child));
    }
    return itemCopy;
  }
}

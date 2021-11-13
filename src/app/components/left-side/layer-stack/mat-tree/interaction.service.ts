import { Injectable } from '@angular/core';
import { TreeService } from './tree.service';
import { ElementType, StackItem } from '../elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../../utils/store.service';
import { findByID, flattenNode } from '../../../../common/Utils';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ID } from '../../../../common/ProjectFileStructure';
import { HistoryService } from '../../../../utils/history.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private drawingMode = false;

  constructor(private treeService: TreeService,
              private store: StoreService,
              private dialog: MatDialog,
              private historyService: HistoryService) {
  }

  refreshView(): void {
    this.store.canvas.requestRenderAll();
    this.historyService.addSnapshot();
  }

  startFreeDrawing(): void {
    this.drawingMode = true;
  }

  stopFreeDrawing(): void {
    this.drawingMode = false;
  }

  deselectCurrentItems(): void {
    this.treeService.selectedItem = null;
    const elements = document.querySelectorAll('.selected-item, .selected-root');
    elements.forEach(el => {
      el.classList.remove('selected-item');
      el.classList.remove('selected-root');
    });
  }

  onItemInLayerStackSelected(item: StackItem): void {
    this.store.canvas.discardActiveObject();
    let selection;
    if (item.type === ElementType.group) {
      const elementListOriginal = flattenNode(item);
      selection = new fabric.ActiveSelection(elementListOriginal, {canvas: this.store.canvas});
    } else {
      selection = this.store.canvas.getObjects().find(element => element[ID] === item.id);
    }
    // this.treeService.selectedItem = item;
    this.store.canvas.setActiveObject(selection);
    this.refreshView();
  }

  onItemInCanvasSelected(ids: string[]): void {
    if (this.treeService.selectedItem && this.treeService.selectedItem.type === ElementType.group) {
      return;
    }
    if (!this.drawingMode) {
      this.deselectCurrentItems();
      if (ids.length < 2) {
        this.treeService.selectedItem = findByID(ids[0], this.treeService.itemList);
      }
      ids.forEach(id => {
        const element = document.getElementById(id);
        element.classList.add('selected-item');
      });
    }
    this.refreshView();
  }

  onDeleteSelection(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'Delete selected elements?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.canvas.getActiveObjects().forEach(it => {
          this.store.canvas.remove(it);
          this.treeService.deleteItemByID(it[ID]);
        });
        if (this.treeService.selectedItem && this.treeService.selectedItem.type === ElementType.group) {
          this.treeService.deleteItemByID(this.treeService.selectedItem.id);
        }
        this.store.canvas.discardActiveObject();
        this.refreshView();
      }
    });
  }
}

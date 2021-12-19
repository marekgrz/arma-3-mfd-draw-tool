import { Directive } from '@angular/core';
import { HistoryService } from '../../../../../utils/history.service';
import { TreeService } from '../../../../left-side/layer-stack/mat-tree/tree.service';
import { StackItem } from '../../../../left-side/layer-stack/elements/StackItem';
import { StoreService } from '../../../../../utils/store.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseElementType {

  constructor(public store: StoreService,
              public historyService: HistoryService,
              public treeService: TreeService) {
  }

  createNewElement(item: StackItem): void {
    this.store.canvas.add(item.data);
    this.treeService.pushToListInCorrectPlace(item);
    this.historyService.addSnapshot();
  }
}

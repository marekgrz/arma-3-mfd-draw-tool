import { Directive } from '@angular/core';
import { HistoryService } from '../../../../../utils/history.service';
import { TreeService } from '../../../../left-side/layer-stack-ng/tree.service';
import { StackItem } from '../../../../left-side/layer-stack-ng/elements/StackItem';
import { StoreService } from '../../../../../utils/store.service';
import { Point } from '../../../../../common/Point';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseElementType {

  constructor(public store: StoreService,
              public historyService: HistoryService,
              public treeService: TreeService) {
  }

  createNewElement(item: StackItem): void {
    item.base.position = Point.from(item.data.left, item.data.top);
    item.data.on('mousedown', (event) => {
      if (event.button === 3) {
        this.store.openContextMenu(event);
      }
    });
    this.store.canvas.add(item.data);
    this.treeService.pushToListInCorrectPlace(item);
    this.historyService.addSnapshot();
  }
}

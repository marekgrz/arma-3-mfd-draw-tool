import { Component } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { ID, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-rectangle-type',
  templateUrl: './rectangle-type.component.html',
  styleUrls: ['./rectangle-type.component.less']
})
export class RectangleTypeComponent extends BaseElementType {


  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke: '#000000',
      strokeWidth: 1,
      strokeUniform: true,
    });
    rect[ID] = generateId();
    rect[LINETYPE] = LineType.full;
    this.createNewElement(this.treeService.itemFromRectangle(rect));
  }
}

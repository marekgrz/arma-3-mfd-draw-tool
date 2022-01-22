import { Component } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack-ng/tree.service';
import { fabric } from 'fabric';
import { Color } from '@angular-material-components/color-picker';
import { generateId } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { ID } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-polygon-rectangle-type',
  templateUrl: './polygon-rectangle-type.component.html',
  styleUrls: ['./polygon-rectangle-type.component.less']
})
export class PolygonRectangleTypeComponent extends BaseElementType {


  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addPolygonRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    rect[ID] = generateId();
    this.createNewElement(this.treeService.itemFromPolygonRectangle(rect));
  }
}

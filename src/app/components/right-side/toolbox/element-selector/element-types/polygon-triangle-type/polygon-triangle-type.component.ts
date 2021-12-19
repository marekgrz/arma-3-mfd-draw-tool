import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { Color } from '@angular-material-components/color-picker';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { ID } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-polygon-triangle-type',
  templateUrl: './polygon-triangle-type.component.html',
  styleUrls: ['./polygon-triangle-type.component.less']
})
export class PolygonTriangleTypeComponent extends BaseElementType {


  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addPolygonTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    triangle[ID] = generateId();
    this.createNewElement(this.treeService.itemFromPolygonTriangle(triangle));
  }
}

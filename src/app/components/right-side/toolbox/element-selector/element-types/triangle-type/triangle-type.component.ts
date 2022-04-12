import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { TreeService } from '../../../../../left-side/layer-stack-ng/tree.service';
import { StoreService } from '../../../../../../utils/store.service';
import { ID, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-triangle-type',
  templateUrl: './triangle-type.component.html',
  styleUrls: ['./triangle-type.component.less']
})
export class TriangleTypeComponent extends BaseElementType {

  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 0, top: 0,
      fill: 'rgba(0,0,0,0)',
      stroke: '#000000',
      centeredRotation: true,
      strokeWidth: 1,
      strokeUniform: true
    });
    triangle[ID] = generateId();
    triangle[LINETYPE] = LineType.full;
    this.createNewElement(this.treeService.itemFromTriangle(triangle));
  }
}

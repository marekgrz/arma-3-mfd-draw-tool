import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack-ng/tree.service';
import { CIRCLE_STEP, ID, LINE_TYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-circle-type',
  templateUrl: './circle-type.component.html',
  styleUrls: ['./circle-type.component.less']
})
export class CircleTypeComponent extends BaseElementType {

  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addCircle(): void {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'rgba(0,0,0,0)',
      stroke: '#000000',
      strokeWidth: 1,
      strokeUniform: true,
      left: 50, top: 50
    });
    circle[ID] = generateId();
    circle[CIRCLE_STEP] = 0.1;
    circle[LINE_TYPE] = LineType.full;
    this.createNewElement(this.treeService.itemFromCircle(circle));
  }
}

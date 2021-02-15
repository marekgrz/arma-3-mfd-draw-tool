import { Component, OnInit } from '@angular/core';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../layer-stack/elements/StackItem';
import {StoreService} from '../../../../../utils/store.service';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.less']
})
export class CircleComponent  {

  constructor(private store: StoreService,
              private treeService: TreeService) { }

  addCircle(): void {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true,
      left: 50, top: 50
    });
    circle['id'] = generateId();
    circle['circleStep'] = 0.1;
    this.store.canvas.add(circle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromCircle(circle));
  }
}

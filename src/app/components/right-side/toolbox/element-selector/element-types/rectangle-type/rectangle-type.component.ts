import { Component } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { fabric } from 'fabric';
import { Color } from '@angular-material-components/color-picker';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { ID, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';

@Component({
  selector: 'mfd-rectangle-type',
  templateUrl: './rectangle-type.component.html',
  styleUrls: ['./rectangle-type.component.less']
})
export class RectangleTypeComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
  }

  addRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true,
    });
    rect[ID] = generateId();
    rect[LINETYPE] = LineType.full;
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromRectangle(rect));
  }
}

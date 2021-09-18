import { Component } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { fabric } from 'fabric';
import { Color } from '@angular-material-components/color-picker';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { ID } from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'mfd-polygon-rectangle-type',
  templateUrl: './polygon-rectangle-type.component.html',
  styleUrls: ['./polygon-rectangle-type.component.less']
})
export class PolygonRectangleTypeComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
  }

  addPolygonRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    rect[ID] = generateId();
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromPolygonRectangle(rect));
  }
}

import {Component} from '@angular/core';
import {StoreService} from '../../../../../utils/store.service';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../layer-stack/elements/StackItem';

@Component({
  selector: 'app-polygon-rectangle',
  templateUrl: './polygon-rectangle.component.html',
  styleUrls: ['./polygon-rectangle.component.less']
})
export class PolygonRectangleComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
  }

  addPolygonRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    rect['id'] = generateId();
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromPolygonRectangle(rect));
  }
}

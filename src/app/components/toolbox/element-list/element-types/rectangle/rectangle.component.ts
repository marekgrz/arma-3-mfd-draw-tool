import {Component} from '@angular/core';
import {StoreService} from '../../../../../utils/store.service';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../layer-stack/elements/StackItem';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.less']
})
export class RectangleComponent {

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
      strokeDashArray: [10, 5],
    });
    rect['id'] = generateId();
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromRectangle(rect));
  }
}

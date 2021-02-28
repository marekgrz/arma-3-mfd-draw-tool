import {Component} from '@angular/core';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../../left-side/layer-stack/elements/StackItem';
import {StoreService} from '../../../../../../utils/store.service';
import {TreeService} from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import {ID} from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-polygon-triangle',
  templateUrl: './polygon-triangle.component.html',
  styleUrls: ['./polygon-triangle.component.less']
})
export class PolygonTriangleComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
  }

  addPolygonTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    triangle[ID] = generateId();
    this.store.canvas.add(triangle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromPolygonTriangle(triangle));
  }
}

import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Color } from '@angular-material-components/color-picker';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { StoreService } from '../../../../../../utils/store.service';
import { ID, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';

@Component({
  selector: 'mfd-triangle-type',
  templateUrl: './triangle-type.component.html',
  styleUrls: ['./triangle-type.component.less']
})
export class TriangleTypeComponent implements OnInit {

  constructor(private treeService: TreeService,
              private store: StoreService) {
  }

  ngOnInit(): void {
  }

  addTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 0, top: 0,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      centeredRotation: true,
      strokeWidth: 1,
      strokeUniform: true
    });
    triangle[ID] = generateId();
    triangle[LINETYPE] = LineType.full;
    this.store.canvas.add(triangle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTriangle(triangle));
  }
}

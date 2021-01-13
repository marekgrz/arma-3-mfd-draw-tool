import { Component, OnInit } from '@angular/core';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../layer-stack/elements/StackItem';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';
import {StoreService} from '../../../../../utils/store.service';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.less']
})
export class TriangleComponent implements OnInit {

  constructor(private treeService: TreeService,
              private store: StoreService) { }

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
    triangle['id'] = generateId();
    this.store.canvas.add(triangle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTriangle(triangle));
  }
}

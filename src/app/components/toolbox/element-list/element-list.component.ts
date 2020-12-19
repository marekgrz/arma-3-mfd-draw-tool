import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from 'fabric/fabric-impl';
import {StoreService} from '../../../utils/store.service';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less']
})
export class ElementListComponent implements OnInit {

  searchValue = '';
  elementTypes: string[];
  private allElementTypes: string[] = ['Rectangle', 'Line', 'Text'];
  canvas: Canvas;

  constructor(public store: StoreService,
              public treeService: TreeService) {
  }

  ngOnInit(): void {
    this.elementTypes = [...this.allElementTypes];
    this.canvas = this.store.canvas;
  }

  filterOptions(): void {
    this.elementTypes = this.allElementTypes.filter(it => it.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  addLine(): void {
    const line = new fabric.Line(
      [100, 100, 200, 100],
      {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 5,
        lockScalingY: true,
        cornerSize: 3
      });
    this.canvas.add(line);
  }

  addRect(): void {
    this.canvas.add(new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 10,
    }));
    this.treeService.itemList.push()
  }
}

import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from 'fabric/fabric-impl';
import {StoreService} from '../../../utils/store.service';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';
import {generateId} from '../../layer-stack/elements/StackItem';
import {Color} from '@angular-material-components/color-picker';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less']
})
export class ElementListComponent implements OnInit {

  searchValue = '';
  elementTypes: string[];
  private allElementTypes: string[] = ['Rectangle', 'Line', 'Text', 'Texture'];
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
    line['id'] = generateId();
    this.canvas.add(line);
  }

  addRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true
    });
    rect['id'] = generateId();
    this.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromRectangle(rect));
  }

  addTexture(): void {
    const htmlImage = new Image();
    htmlImage.onload = img => {
      const image = new fabric.Image(htmlImage, {
        angle: 0,
        left: 100,
        top: 100,
        strokeUniform: true
      });
      image.scaleToWidth(100);
      image.scaleToHeight(100);
      image['id'] = generateId();
      this.canvas.add(image);
      this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTexture(image));
    };
    htmlImage.src = 'assets/image-placeholder.webp';
  }
}

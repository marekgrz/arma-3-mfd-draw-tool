import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { LineType } from '../../../../../../templates/Line';
import { BONENAME, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../BaseElementType';

@Component({
  selector: 'mfd-triangle-properties',
  templateUrl: './triangle-properties.component.html',
  styleUrls: ['./triangle-properties.component.less']
})
export class TrianglePropertiesComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  angle: number;
  color: FormControl;
  lineType = LineType.full;

  constructor(public store: StoreService) {
    super(store);
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.angle = this.getAngle();
    this.boneName = this.item.element[BONENAME];
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
    this.lineType = this.item.element[LINETYPE];
  }

  save(): void {
    const triangle: fabric.Triangle = this.store.canvas.getActiveObject();
    triangle.scaleX = Number(this.newWidth / this.item.element.width);
    triangle.scaleY = Number(this.newHeight / this.item.element.height);
    this.setElementPosition(triangle, this.item);
    this.setElementLineType(triangle, this.lineType);
    triangle.set('stroke', this.color.value);
    triangle.set('strokeWidth', Number(this.item.element.strokeWidth));
    triangle.setCoords();
    triangle.rotate(this.angle);
    this.store.canvas.requestRenderAll();
  }

  updateHeight(event): void {
    this.newHeight = event.target.value;
    this.save();
  }

  updateWidth(event): void {
    this.newWidth = event.target.value;
    this.save();
  }

  getWidth(): number {
    return this.item.element.width * this.item.element.scaleX;
  }

  getHeight(): number {
    return this.item.element.height * this.item.element.scaleY;
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

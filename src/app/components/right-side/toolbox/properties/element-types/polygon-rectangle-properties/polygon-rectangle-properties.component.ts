import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { BaseElementType } from '../BaseElementType';
import { BONENAME } from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-polygon-rectangle-properties',
  templateUrl: './polygon-rectangle-properties.component.html',
  styleUrls: ['./polygon-rectangle-properties.component.less']
})
export class PolygonRectanglePropertiesComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  angle: number;
  color: FormControl;

  constructor(store: StoreService) {
    super(store);
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.angle = this.getAngle();
    this.boneName = this.item.element[BONENAME];
    this.color = new FormControl(this.store.canvas.getActiveObject().fill);
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(rect, this.item);
    rect.scaleX = Number(this.newWidth / this.item.element.width);
    rect.scaleY = Number(this.newHeight / this.item.element.height);
    rect.set('fill', this.color.value);
    rect.setCoords();
    rect.rotate(this.angle);
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

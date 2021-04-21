import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../../left-side/layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../../utils/store.service';
import {fabric} from 'fabric';
import { BaseElementType } from '../BaseElementType';
import { element } from 'protractor';
import { BONENAME } from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-polygon-triangle-element',
  templateUrl: './polygon-triangle-element.component.html',
  styleUrls: ['./polygon-triangle-element.component.less']
})
export class PolygonTriangleElementComponent extends BaseElementType implements OnInit {

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
    const triangle: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(triangle, this.item);
    triangle.scaleX = Number(this.newWidth / this.item.element.width);
    triangle.scaleY = Number(this.newHeight / this.item.element.height);
    triangle.set('fill', this.color.value);
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

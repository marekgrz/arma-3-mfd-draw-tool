import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import { FormControl } from '@angular/forms';
import { LineType } from '../../../../../../templates/Line';
import { BONENAME, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../BaseElementType';
import { BoneFixedModel } from '../../../../../left-side/bones-list/BoneBaseModel';

@Component({
  selector: 'app-rectangle-element',
  templateUrl: './rectangle-element.component.html',
  styleUrls: ['./rectangle-element.component.less']
})
export class RectangleElementComponent extends BaseElementType implements OnInit {

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
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    rect.scaleX = Number(this.newWidth / this.item.element.width);
    rect.scaleY = Number(this.newHeight / this.item.element.height);
    this.setElementPosition(rect, this.item);
    this.setElementLineType(rect, this.lineType);
    rect.set('stroke', this.color.value);
    rect.set('strokeWidth', Number(this.item.element.strokeWidth));
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

import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import { FormControl } from '@angular/forms';
import { LineType } from '../../../../../../templates/Line';
import { BONENAME, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../BaseElementType';

@Component({
  selector: 'mfd-rectangle-properties',
  templateUrl: './rectangle-properties.component.html',
  styleUrls: ['./rectangle-properties.component.less']
})
export class RectanglePropertiesComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;
  angle: number;
  color: FormControl;
  lineType = LineType.full;

  constructor(public store: StoreService) {
    super(store);
  }

  ngOnInit(): void {
    this.angle = this.getAngle();
    this.boneName = this.item.element[BONENAME];
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
    this.lineType = this.item.element[LINETYPE];
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(rect, this.item);
    this.setElementLineType(rect, this.lineType);
    rect.set('stroke', this.color.value);
    rect.set('strokeWidth', Number(this.item.element.strokeWidth));
    rect.setCoords();
    rect.rotate(this.angle);
    this.store.canvas.requestRenderAll();
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

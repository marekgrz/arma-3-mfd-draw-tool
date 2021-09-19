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
    const triangle: fabric.Triangle = this.store.canvas.getActiveObject();
    this.setElementPosition(triangle, this.item);
    this.setElementLineType(triangle, this.lineType);
    triangle.set('stroke', this.color.value);
    triangle.set('strokeWidth', Number(this.item.element.strokeWidth));
    triangle.setCoords();
    triangle.rotate(this.angle);
    this.store.canvas.requestRenderAll();
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

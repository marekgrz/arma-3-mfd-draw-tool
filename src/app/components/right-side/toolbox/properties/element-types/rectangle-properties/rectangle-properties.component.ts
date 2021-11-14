import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import { FormControl } from '@angular/forms';
import { LineType } from '../../../../../../templates/Line';
import { LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-rectangle-properties',
  templateUrl: './rectangle-properties.component.html',
  styleUrls: ['./rectangle-properties.component.less']
})
export class RectanglePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  color: FormControl;
  lineType = LineType.full;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
    this.lineType = this.item.element[LINETYPE];
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(rect, this.item);
    this.setElementLineType(rect, this.lineType);
    this.setElementStroke(rect, this.color.value, this.item.element.strokeWidth);
    rect.setCoords();
    rect.rotate(this.angle);
    this.interactionService.refreshView();
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

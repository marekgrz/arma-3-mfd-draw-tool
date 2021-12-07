import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
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
  color: string;
  lineType = LineType.full;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.lineType = this.item.data[LINETYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(rect);
    this.setElementLineType(rect, this.lineType);
    this.setElementStroke(rect);
    this.setElementRotation(rect);
    this.interactionService.refreshView();
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }
}

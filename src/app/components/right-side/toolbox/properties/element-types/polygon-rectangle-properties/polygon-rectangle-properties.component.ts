import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { ElementTransformService } from '../element-transform.service';

@Component({
  selector: 'mfd-polygon-rectangle-properties',
  templateUrl: './polygon-rectangle-properties.component.html',
  styleUrls: ['./polygon-rectangle-properties.component.less']
})
export class PolygonRectanglePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  color: string;

  constructor(public store: StoreService, interactionService: InteractionService, elementTransformService: ElementTransformService) {
    super(store, interactionService, elementTransformService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.color = this.store.canvas.getActiveObject().fill as string;
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(rect);
    this.setElementFill(rect);
    this.setElementRotation(rect);
    this.refresh();
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }
}

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { LineType } from '../../../../../../templates/Line';
import { LINE_TYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { ElementTransformService } from '../element-transform.service';

@Component({
  selector: 'mfd-triangle-properties',
  templateUrl: './triangle-properties.component.html',
  styleUrls: ['./triangle-properties.component.less']
})
export class TrianglePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  color: string;
  lineType = LineType.full;

  constructor(public store: StoreService, interactionService: InteractionService, elementTransformService: ElementTransformService) {
    super(store, interactionService, elementTransformService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.lineType = this.item.data[LINE_TYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
  }

  save(): void {
    const triangle: fabric.Triangle = this.store.canvas.getActiveObject();
    this.setElementPosition(triangle);
    this.setElementLineType(triangle, this.lineType);
    this.setElementStroke(triangle);
    this.setElementRotation(triangle);
    this.refresh();
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }
}

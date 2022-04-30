import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { Circle } from 'fabric/fabric-impl';
import { CIRCLE_STEP, LINE_TYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { ElementTransformService } from '../element-transform.service';

@Component({
  selector: 'mfd-circle-properties',
  templateUrl: './circle-properties.component.html',
  styleUrls: ['./circle-properties.component.less']
})
export class CirclePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  radiusX: number;
  radiusY: number;
  uniformRadius = true;
  circleStep = 0.1;
  lineType = LineType.full;

  constructor(public store: StoreService, interactionService: InteractionService, elementTransformService: ElementTransformService) {
    super(store, interactionService, elementTransformService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.radiusX = this.getRadiusX();
    this.radiusY = this.getRadiusY();
    this.angle = this.getAngle();
    this.circleStep = this.item.data[CIRCLE_STEP];
    this.lineType = this.item.data[LINE_TYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
  }

  save(): void {
    const circle: fabric.Circle = this.store.canvas.getActiveObject() as Circle;
    circle.left = Number(this.item.data.left);
    circle.top = Number(this.item.data.top);
    circle.scaleX = Number(this.radiusX / this.item.data.width * 2);
    circle.scaleY = Number(this.radiusY / this.item.data.height * 2);
    circle[CIRCLE_STEP] = this.circleStep;
    this.setElementPosition(circle);
    this.setElementLineType(circle, this.lineType);
    this.setElementStroke(circle);
    this.setElementRotation(circle);
    this.refresh();
  }

  updateDiameterX(event): void {
    this.radiusX = event.target.value;
    this.save();
  }

  updateDiameterY(event): void {
    this.radiusY = event.target.value;
    this.save();
  }

  updateDiameter(event): void {
    this.radiusX = event.target.value;
    this.radiusY = event.target.value;
    this.save();
  }

  getRadiusX(): number {
    return (this.item.data.width * this.item.data.scaleX) / 2;
  }

  getRadiusY(): number {
    return (this.item.data.height * this.item.data.scaleY) / 2;
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }

  makeRadiusUniform(): void {
    if (this.uniformRadius) {
      this.radiusY = this.radiusX.valueOf();
      this.save();
    }
  }
}

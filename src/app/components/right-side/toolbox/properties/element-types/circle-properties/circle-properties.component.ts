import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { Circle } from 'fabric/fabric-impl';
import { CIRCLESTEP, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-circle-properties',
  templateUrl: './circle-properties.component.html',
  styleUrls: ['./circle-properties.component.less']
})
export class CirclePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  newDiameterX: number;
  newDiameterY: number;
  uniformDiameter = true;
  circleStep = 0.1;
  lineType = LineType.full;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.newDiameterX = this.getDiameterX();
    this.newDiameterY = this.getDiameterY();
    this.angle = this.getAngle();
    this.circleStep = this.item.element[CIRCLESTEP];
    this.lineType = this.item.element[LINETYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
  }

  save(): void {
    const circle: fabric.Circle = this.store.canvas.getActiveObject() as Circle;
    circle.left = Number(this.item.element.left);
    circle.top = Number(this.item.element.top);
    circle.scaleX = Number(this.newDiameterX / this.item.element.width);
    circle.scaleY = Number(this.newDiameterY / this.item.element.height);
    circle[CIRCLESTEP] = this.circleStep;
    this.setElementPosition(circle);
    this.setElementLineType(circle, this.lineType);
    this.setElementStroke(circle);
    this.setElementRotation(circle);
    this.interactionService.refreshView();
  }

  updateDiameterX(event): void {
    this.newDiameterX = event.target.value;
    this.save();
  }

  updateDiameterY(event): void {
    this.newDiameterY = event.target.value;
    this.save();
  }

  updateDiameter(event): void {
    this.newDiameterX = event.target.value;
    this.newDiameterY = event.target.value;
    this.save();
  }

  getDiameterX(): number {
    return this.item.element.width * this.item.element.scaleX;
  }

  getDiameterY(): number {
    return this.item.element.height * this.item.element.scaleY;
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }

  makeDiameterUniform(): void {
    if (this.uniformDiameter) {
      this.newDiameterY = this.newDiameterX.valueOf();
      this.save();
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../../left-side/layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../../utils/store.service';
import {fabric} from 'fabric';
import {Circle} from 'fabric/fabric-impl';
import {CIRCLESTEP, LINETYPE} from '../../../../../../common/ProjectFileStructure';
import {LineType} from '../../../../../../templates/Line';
import {BaseElementType} from '../BaseElementType';

@Component({
  selector: 'app-circle-element',
  templateUrl: './circle-element.component.html',
  styleUrls: ['./circle-element.component.less']
})
export class CircleElementComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  angle: number;
  color: FormControl;
  newDiameterX: number;
  newDiameterY: number;
  uniformDiameter = true;
  circleStep = 0.1;
  lineType = LineType.full;

  constructor(public store: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.newDiameterX = this.getDiameterX();
    this.newDiameterY = this.getDiameterY();
    this.angle = this.getAngle();
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
    this.circleStep = this.item.element[CIRCLESTEP];
    this.lineType = this.item.element[LINETYPE];
  }

  save(): void {
    const circle: fabric.Circle = this.store.canvas.getActiveObject() as Circle;
    circle.left = Number(this.item.element.left);
    circle.top = Number(this.item.element.top);
    circle.scaleX = Number(this.newDiameterX / this.item.element.width);
    circle.scaleY = Number(this.newDiameterY / this.item.element.height);
    circle[CIRCLESTEP] = this.circleStep;
    circle[LINETYPE] = this.lineType;
    this.setElementLineType(circle, this.lineType);
    circle.set('stroke', this.color.value);
    circle.set('strokeWidth', Number(this.item.element.strokeWidth));
    circle.setCoords();
    circle.rotate(this.angle);
    this.store.canvas.requestRenderAll();
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

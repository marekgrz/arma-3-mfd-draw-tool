import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../utils/store.service';
import {fabric} from 'fabric';
import {Circle} from 'fabric/fabric-impl';

@Component({
  selector: 'app-circle-element',
  templateUrl: './circle-element.component.html',
  styleUrls: ['./circle-element.component.less']
})
export class CircleElementComponent implements OnInit {

  @Input()
  item: StackItem;

  color: FormControl;
  newDiameterX: number;
  newDiameterY: number;
  uniformDiameter = true;

  constructor(private store: StoreService) {
  }

  ngOnInit(): void {
    this.newDiameterX = this.getDiameterX();
    this.newDiameterY = this.getDiameterY();
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
  }

  save(): void {
    const circle: fabric.Circle = this.store.canvas.getActiveObject() as Circle;
    circle.left = Number(this.item.element.left);
    circle.top = Number(this.item.element.top);
    circle.scaleX = Number(this.newDiameterX / this.item.element.width);
    circle.scaleY = Number(this.newDiameterY / this.item.element.height);
    circle.set('stroke', this.color.value);
    circle.set('strokeWidth', Number(this.item.element.strokeWidth));
    circle.angle = this.item.element.angle;
    circle.setCoords();
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

  makeDiameterUniform() {
    if (this.uniformDiameter) {
      this.newDiameterY = this.newDiameterX.valueOf();
      this.save();
    }
  }

}

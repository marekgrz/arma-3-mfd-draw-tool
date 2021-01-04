import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../utils/store.service';
import {fabric} from 'fabric';

@Component({
  selector: 'app-triangle-element',
  templateUrl: './triangle-element.component.html',
  styleUrls: ['./triangle-element.component.less']
})
export class TriangleElementComponent implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  angle: number;
  color: FormControl;

  constructor(private store: StoreService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.angle = this.getAngle();
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
  }

  save(): void {
    const triangle: fabric.Triangle = this.store.canvas.getActiveObject();
    triangle.left = Number(this.item.element.left);
    triangle.top = Number(this.item.element.top);
    triangle.scaleX = Number(this.newWidth / this.item.element.width);
    triangle.scaleY = Number(this.newHeight / this.item.element.height);
    triangle.set('stroke', this.color.value);
    triangle.set('strokeWidth', Number(this.item.element.strokeWidth));
    triangle.setCoords();
    triangle.rotate(this.angle);
    this.store.canvas.requestRenderAll();
  }

  updateHeight(event): void {
    this.newHeight = event.target.value;
    this.save();
  }

  updateWidth(event): void {
    this.newWidth = event.target.value;
    this.save();
  }

  getWidth(): number {
    return this.item.element.width * this.item.element.scaleX;
  }

  getHeight(): number {
    return this.item.element.height * this.item.element.scaleY;
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

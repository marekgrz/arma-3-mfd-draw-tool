import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {fabric} from 'fabric';
import {StoreService} from '../../../../../utils/store.service';

@Component({
  selector: 'app-rectangle-element',
  templateUrl: './rectangle-element.component.html',
  styleUrls: ['./rectangle-element.component.less']
})
export class RectangleElementComponent implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;

  constructor(private store: StoreService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
  }

  save(): void {
    const rect: fabric.Rect = this.store.canvas.getActiveObject();
    rect.left = Number(this.item.element.left);
    rect.top = Number(this.item.element.top);
    rect.scaleX = Number(this.newWidth / this.item.element.width);
    rect.scaleY = Number(this.newHeight / this.item.element.height);
    rect.set('strokeWidth', Number(this.item.element.strokeWidth));
    rect.angle = this.item.element.angle;
    rect.setCoords();
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
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StackItem } from '../../../../../../left-side/layer-stack-ng/elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../../utils/store.service';

@Component({
  selector: 'mfd-dimensions-input',
  templateUrl: './dimensions-input.component.html',
  styleUrls: ['./dimensions-input.component.less']
})
export class DimensionsInputComponent implements OnInit {

  @Input()
  item: StackItem;

  @Output()
  itemChange = new EventEmitter<StackItem>();

  @Output()
  save = new EventEmitter<void>();

  private newHeight = 0;
  private newWidth = 0;

  constructor(public store: StoreService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
  }

  onSave(): void {
    const element: fabric.Object = this.store.canvas.getActiveObject();
    element.scaleX = Number(this.newWidth / this.item.data.width);
    element.scaleY = Number(this.newHeight / this.item.data.height);
    this.itemChange.emit(this.item);
    this.save.emit();
  }

  updateHeight(event): void {
    this.newHeight = event.target.value;
    this.onSave();
  }

  updateWidth(event): void {
    this.newWidth = event.target.value;
    this.onSave();
  }

  getWidth(): number {
    return this.item.data.width * this.item.data.scaleX;
  }

  getHeight(): number {
    return this.item.data.height * this.item.data.scaleY;
  }
}

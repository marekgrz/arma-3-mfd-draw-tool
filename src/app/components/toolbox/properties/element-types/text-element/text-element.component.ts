import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../utils/store.service';
import {fabric} from 'fabric';
import {IText} from 'fabric/fabric-impl';

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.less']
})
export class TextElementComponent {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  color: FormControl;
  fontName: string;

  constructor(public store: StoreService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.color = new FormControl(this.store.canvas.getActiveObject().fill);
    this.fontName = this.item.element.fontFamily;
  }

  save(): void {
    console.log(this.fontName);
    const text = this.store.canvas.getActiveObject() as any;
    text.left = Number(this.item.element.left);
    text.top = Number(this.item.element.top);
    text.scaleX = Number(this.newWidth / this.item.element.width);
    text.scaleY = Number(this.newHeight / this.item.element.height);
    text.fontSize = this.item.element.fontSize;
    text.set('fontFamily', this.fontName);
    text.set('fill', this.color.value);
    text.setCoords();
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

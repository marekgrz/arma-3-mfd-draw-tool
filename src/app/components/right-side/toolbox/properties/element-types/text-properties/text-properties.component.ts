import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../../../../../utils/store.service';
import { SourceService } from '../../../../../../utils/source.service';

@Component({
  selector: 'mfd-text-properties',
  templateUrl: './text-properties.component.html',
  styleUrls: ['./text-properties.component.less']
})
export class TextPropertiesComponent implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  color: FormControl;
  fontName: string;
  source: string;
  staticText = true;
  value = '1';

  constructor(public store: StoreService,
              public sources: SourceService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.color = new FormControl(this.store.canvas.getActiveObject().fill);
    this.fontName = this.item.element.fontFamily;
  }

  save(): void {
    const text = this.store.canvas.getActiveObject() as any;
    text.left = Number(this.item.element.left);
    text.top = Number(this.item.element.top);
    text.scaleX = Number(this.newWidth / this.item.element.width);
    text.scaleY = Number(this.newHeight / this.item.element.height);
    text.set('fontFamily', this.fontName);
    text.set('fill', this.color.value);
    text.setCoords();
    text['source'] = this.source;
    this.store.canvas.requestRenderAll();
  }

  refreshText(): void {
    this.store.canvas.requestRenderAll();
  }

  getAvailableSources(): string[] {
    return Object.keys(this.sources);
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

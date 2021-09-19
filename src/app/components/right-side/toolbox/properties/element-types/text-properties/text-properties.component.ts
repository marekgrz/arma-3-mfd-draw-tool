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

  color: FormControl;
  fontName: string;
  source: string;
  staticText = true;
  value = '1';

  constructor(public store: StoreService,
              public sources: SourceService) {
  }

  ngOnInit(): void {
    this.color = new FormControl(this.store.canvas.getActiveObject().fill);
    this.fontName = this.item.element.fontFamily;
  }

  save(): void {
    const text = this.store.canvas.getActiveObject() as any;
    text.left = Number(this.item.element.left);
    text.top = Number(this.item.element.top);
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
}

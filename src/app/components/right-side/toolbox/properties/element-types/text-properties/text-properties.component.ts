import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { SourceService } from '../../../../../../utils/source.service';

@Component({
  selector: 'mfd-text-properties',
  templateUrl: './text-properties.component.html',
  styleUrls: ['./text-properties.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TextPropertiesComponent implements OnInit {

  @Input()
  item: StackItem;

  color: string;
  fontName: string;
  source: string;
  staticText = true;
  value = '1';

  constructor(public store: StoreService,
              public sources: SourceService) {
  }

  ngOnInit(): void {
    this.fontName = this.item.data.fontFamily;
    this.color = this.store.canvas.getActiveObject().fill as string;
  }

  save(): void {
    const text = this.store.canvas.getActiveObject() as any;
    text.left = Number(this.item.data.left);
    text.top = Number(this.item.data.top);
    text.set('fontFamily', this.fontName);
    text.set('fill', this.color);
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
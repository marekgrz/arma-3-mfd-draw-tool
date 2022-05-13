import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { SourceService } from '../../../../../../utils/source.service';
import { MatSliderChange } from '@angular/material/slider';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { SOURCE } from '../../../../../../common/ProjectFileStructure';

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
  source = 'altitudeASL';
  staticText = true;
  value = '1';

  constructor(public store: StoreService,
              public sources: SourceService,
              private interaction: InteractionService) {
  }

  ngOnInit(): void {
    this.fontName = this.item.data.fontFamily;
    this.color = this.store.canvas.getActiveObject().fill as string;
    this.staticText = this.item.data[SOURCE] === 'static';
    if (!this.staticText) {
      this.source = this.item.data[SOURCE];
    }
    if (!this.item.data.sourceScale) {
      this.item.data.sourceScale = 1;
    }
  }

  save(): void {
    const text = this.store.canvas.getActiveObject() as any;
    text.left = Number(this.item.data.left);
    text.top = Number(this.item.data.top);
    text.set('fontFamily', this.fontName);
    text.set('fill', this.color);
    text.set('originX', this.item.data.textAlign);
    text.setCoords();
    text[SOURCE] = this.staticText ? 'static' : this.source;
    text.lockRotation = true;
    this.interaction.refreshView();
  }

  refreshText(change: MatSliderChange = null): void {
    if (!this.staticText) {
      this.item.data.text = (change.value * this.item.data.sourceScale).toString();
    }
    this.store.canvas.requestRenderAll();
  }
}
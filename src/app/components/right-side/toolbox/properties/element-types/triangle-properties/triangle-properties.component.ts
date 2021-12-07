import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { LineType } from '../../../../../../templates/Line';
import { BONENAME, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-triangle-properties',
  templateUrl: './triangle-properties.component.html',
  styleUrls: ['./triangle-properties.component.less']
})
export class TrianglePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  color: string;
  lineType = LineType.full;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.lineType = this.item.data[LINETYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
  }

  save(): void {
    const triangle: fabric.Triangle = this.store.canvas.getActiveObject();
    this.setElementPosition(triangle);
    this.setElementLineType(triangle, this.lineType);
    this.setElementStroke(triangle);
    this.setElementRotation(triangle);
    this.interactionService.refreshView();
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }
}

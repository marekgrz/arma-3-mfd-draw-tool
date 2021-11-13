import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { BaseElementType } from '../BaseElementType';
import { BONENAME } from '../../../../../../common/ProjectFileStructure';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-polygon-triangle-properties',
  templateUrl: './polygon-triangle-properties.component.html',
  styleUrls: ['./polygon-triangle-properties.component.less']
})
export class PolygonTrianglePropertiesComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  angle: number;
  color: FormControl;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    this.angle = this.getAngle();
    this.boneName = this.item.element[BONENAME];
    this.color = new FormControl(this.store.canvas.getActiveObject().fill);
  }

  save(): void {
    const triangle: fabric.Rect = this.store.canvas.getActiveObject();
    this.setElementPosition(triangle, this.item);
    triangle.set('fill', this.color.value);
    triangle.setCoords();
    triangle.rotate(this.angle);
    this.interactionService.refreshView();
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

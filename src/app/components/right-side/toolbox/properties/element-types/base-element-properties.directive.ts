import { LineType } from '../../../../../templates/Line';
import { StoreService } from '../../../../../utils/store.service';
import { StackItem } from '../../../../left-side/layer-stack-ng/elements/StackItem';
import { BONENAME } from '../../../../../common/ProjectFileStructure';
import { InteractionService } from '../../../../left-side/layer-stack-ng/interaction.service';
import { Directive, Input, OnInit } from '@angular/core';
import { ElementTransformService } from './element-transform.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseElementProperties implements OnInit {

  @Input()
  item: StackItem;

  color: string;
  angle: number;

  boneName: string;

  constructor(public store: StoreService,
              private interactionService: InteractionService,
              public elementTransformService: ElementTransformService) {
  }

  ngOnInit(): void {
    this.boneName = this.item.data[BONENAME];
  }

  setElementLineType(element, lineType: LineType): void {
    this.elementTransformService.setElementLineType(element, lineType);
  }

  setElementPosition(element): void {
    this.elementTransformService.setElementPosition(element, this.item, this.boneName);
  }

  setElementStroke(element): void {
    this.elementTransformService.setElementStroke(element, this.color, Number(this.item.data.strokeWidth));
  }

  setElementFill(element): void {
    this.elementTransformService.setElementFill(element, this.color);
  }

  setElementRotation(element): void {
    this.elementTransformService.setElementRotation(element, this.angle);
  }

  refresh(): void {
    this.interactionService.refreshView();
  }
}
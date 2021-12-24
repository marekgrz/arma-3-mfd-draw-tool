import { LineType } from '../../../../../templates/Line';
import { StoreService } from '../../../../../utils/store.service';
import { StackItem } from '../../../../left-side/layer-stack-ng/elements/StackItem';
import { BONENAME, LINETYPE } from '../../../../../common/ProjectFileStructure';
import { BoneFixedModel, BoneType } from '../../../../left-side/bones-list/BoneBaseModel';
import { InteractionService } from '../../../../left-side/layer-stack-ng/interaction.service';
import { Directive, Input, OnInit } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseElementProperties implements OnInit {

  @Input()
  item: StackItem;

  color: string;
  angle: number;

  boneName: string;

  constructor(public store: StoreService, public interactionService: InteractionService) {
  }

  ngOnInit(): void {
    this.boneName = this.item.data[BONENAME];
  }

  setElementLineType(element, lineType: LineType): void {
    element[LINETYPE] = lineType;
    switch (lineType) {
      case LineType.full: {
        element.set('strokeDashArray', undefined);
        break;
      }
      case LineType.dotted: {
        element.set('strokeDashArray', [element['strokeWidth'], element['strokeWidth']]);
        break;
      }
      case LineType.dashed: {
        element.set('strokeDashArray', [Number.parseFloat(element['strokeWidth']) * 2, Number.parseFloat(element['strokeWidth']) * 2]);
        break;
      }
      case LineType.dotDashed: {
        element.set('strokeDashArray', [Number.parseFloat(element['strokeWidth']) * 2, Number.parseFloat(element['strokeWidth']) * 2]);
        break;
      }
      default: {
        element.set('strokeDashArray', undefined);
        break;
      }
    }
  }

  setElementPosition(element): void {
    console.log('Left before: ' + element.left);
    console.log('Top before: ' + element.top);
    const bone = this.store.bones.find(it => it.name === this.boneName);
    const basePosition = this.store.getCanvasPositionFromDiscrete(this.item.base.position);
    element[BONENAME] = this.boneName;
    if (bone === undefined) {
      element.left = basePosition.x;
      element.top = basePosition.y;
      console.log('Left after: ' + element.left);
      console.log('Top after: ' + element.top);
      return;
    }

    switch (bone.type) {
      case BoneType.fixed: {
        element.left = basePosition.x + (bone as BoneFixedModel).pos0.x * this.store.canvasWidth;
        element.top = basePosition.y + (bone as BoneFixedModel).pos0.y * this.store.canvasHeight;
        break;
      }
      // case BoneType.linear: {
      //   element.left = basePositionX + (bone as BoneLinearModel).pos0.x;
      //   element.top = basePositionY + (bone as BoneLinearModel).pos0.y;
      //   break;
      // }
    }
    console.log('Left after: ' + element.left);
    console.log('Top after: ' + element.top);
  }

  setElementStroke(element): void {
    element.set('stroke', this.color);
    element.set('strokeWidth', Number(this.item.data.strokeWidth));
  }

  setElementFill(element): void {
    element.set('fill', this.color);
  }

  setElementRotation(element): void {
    element.setCoords();
    element.rotate(this.angle);
  }
}

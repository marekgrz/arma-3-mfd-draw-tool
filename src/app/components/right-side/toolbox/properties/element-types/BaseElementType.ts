import { LineType } from '../../../../../templates/Line';
import { StoreService } from '../../../../../utils/store.service';
import { StackItem } from '../../../../left-side/layer-stack/elements/StackItem';
import { BONENAME, LINETYPE } from '../../../../../common/ProjectFileStructure';
import { BoneFixedModel, BoneType } from '../../../../left-side/bones-list/BoneBaseModel';

export class BaseElementType {

  boneName: string;

  constructor(public store: StoreService) {
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

  setElementPosition(element, item: StackItem): void {
    console.log('Left before: ' + element.left);
    console.log('Top before: ' + element.top);
    const bone = this.store.bones.find(it => it.name === this.boneName);
    const basePositionX = item.base.position.x * this.store.canvasWidth;
    const basePositionY = item.base.position.y * this.store.canvasHeight;
    element[BONENAME] = this.boneName;
    if (bone === undefined) {
      element.left = basePositionX;
      element.top = basePositionY;
      return;
    }

    switch (bone.type) {
      case BoneType.fixed: {
        element.left = basePositionX + (bone as BoneFixedModel).pos0.x * this.store.canvasWidth;
        element.top = basePositionY + (bone as BoneFixedModel).pos0.y * this.store.canvasHeight;
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
}

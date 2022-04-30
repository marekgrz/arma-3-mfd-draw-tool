import { Injectable } from '@angular/core';
import { LineType } from '../../../../../templates/Line';
import { BONE_NAME, LINE_TYPE } from '../../../../../common/ProjectFileStructure';
import { fabric } from 'fabric';
import { StackItem } from '../../../../left-side/layer-stack-ng/elements/StackItem';
import { BoneFixedModel, BoneType } from '../../../../left-side/bones-list/BoneBaseModel';
import { StoreService } from '../../../../../utils/store.service';

@Injectable({
  providedIn: 'root'
})
export class ElementTransformService {

  constructor(private store: StoreService) { }

  setElementLineType(element, lineType: LineType): void {
    element[LINE_TYPE] = lineType;
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

  setElementPosition(element: fabric.Object, item: StackItem, boneName: string): void {
    const bone = this.store.bones.find(it => it.name === boneName);
    const basePosition = item.base.position;
    element[BONE_NAME] = boneName;
    if (bone === undefined) {
      element.left = basePosition.x;
      element.top = basePosition.y;
    } else {
      switch (bone.type) {
        case BoneType.fixed: {
          element.left = basePosition.x + (bone as BoneFixedModel).pos0.x;
          element.top = basePosition.y + (bone as BoneFixedModel).pos0.y;
          break;
        }
        // TODO rest of bone types
      }
    }
    this.commitElementTransform(element);
  }

  setElementStroke(element: fabric.Object, color: string, width: number): void {
    element.set('stroke', color);
    element.set('strokeWidth', Number(width));
  }

  setElementFill(element: fabric.Object, color: string): void {
    element.set('fill', color);
  }

  setElementRotation(element: fabric.Object, angle: number): void {
    this.commitElementTransform(element);
    element.rotate(angle);
  }

  private commitElementTransform(element: fabric.Object): void {
    element.setCoords();
  }
}

import { Injectable } from '@angular/core';
import { ItemType, StackItem } from '../components/left-side/layer-stack/elements/StackItem';
import { BaseElementModel, ElementType } from '../common/BaseElementModel';
import { ClassGroup } from '../templates/ClassGroup';
import { Color } from '@angular-material-components/color-picker';
import { Line } from '../templates/Line';
import { Polygon } from '../templates/Polygon';
import { Point } from '../common/Point';
import { TreeService } from '../components/left-side/layer-stack/mat-tree/tree.service';
import { CIRCLESTEP, ID, LINETYPE, POINTS } from '../common/ProjectFileStructure';
import { StoreService } from './store.service';
import { Builder } from 'builder-pattern';
import hexRgb from 'hex-rgb';

@Injectable({
  providedIn: 'root'
})
export class ElementParserService {

  constructor(private treeService: TreeService, private store: StoreService) {}

  public getMFDClass(): ClassGroup {
    const bonesClass = Builder(ClassGroup)
      .name('Bones')
      .type(ElementType.group)
      .build();

    const drawClass = Builder(ClassGroup)
      .name('Draw')
      .type(ElementType.group)
      .content( this.convertToA3Format(this.treeService.itemList))
      .build();

    return Builder(ClassGroup)
      .name('MFD')
      .type(ElementType.group)
      .content([bonesClass, drawClass])
      .build();
  }

  private convertToA3Format(itemList: StackItem[]): BaseElementModel[] {
    const classList: BaseElementModel[] = [];
    itemList.forEach(item => {
      if (item.type === ItemType.group) {
        classList.push(this.createGroup(item, this.convertToA3Format(item.children)));
      } else {
        classList.push(this.resolveElement(item));
      }
    });
    return classList.filter(it => it !== undefined);
  }

  private resolveElement(item: StackItem): BaseElementModel {
    switch (item.type) {
      case ItemType.line: {
        return this.createLine(item);
      }
      case ItemType.circle: {
        return this.createLine(this.lineFromCircle(item));
      }
      case ItemType.rectangle: {
        return this.createLine(this.addPointsFromCoords(item));
      }
      case ItemType.triangle: {
        return this.createLine(this.addPointsFromCoords(item));
      }
      case ItemType.polygonRect: {
        return this.createPolygon(this.addPointsFromCoords(item));
      }
      case ItemType.polygonTriangle: {
        return this.createPolygon(this.addPointsFromCoords(item));
      }
      case ItemType.texture: {
        return this.createPolygon(this.addPointsFromCoords(item));
      }
    }
  }

  private createGroup(item: StackItem, content: BaseElementModel[]): ClassGroup {
    return Builder(ClassGroup)
      .name(item.label)
      .type(ElementType.group)
      .color(new Color(1, 1, 1, 1))
      .condition(item.groupProperties?.condition)
      .blinking(item.groupProperties?.blinking)
      .blinkingPattern(item.groupProperties?.blinkingPattern)
      .blinkingStartsOn(item.groupProperties?.blinkingStartsOn)
      .clipTL(item.groupProperties?.clipTL)
      .clipBR(item.groupProperties?.clipBR)
      .clipTLParallax(item.groupProperties?.clipTLParallax)
      .clipBRParallax(item.groupProperties?.clipBRParallax)
      .content(content)
      .build();
  }

  private createLine(item: StackItem): Line {
    const element = item.data;
    return Builder(Line)
      .name(item.label)
      .type(ElementType.line)
      .color(this.toRgba(element.stroke))
      .points(element.points)
      .bone(item.bone)
      .lineType(element[LINETYPE])
      .width(Number(element.strokeWidth))
      .build();
  }

  private createPolygon(item: StackItem): Polygon {
    const element = item.data;
    return Builder(Polygon)
      .name(item.label)
      .type(ElementType.polygon)
      .color(element.fill)
      .texturePath(item.textureFile?.relativePath)
      .points(element.points)
      .build();
  }

  private lineFromCircle(item: StackItem): StackItem {
    const element = item.data;
    const radiusX = element.width / 2;
    const radiusY = element.height / 2;
    const centerX = 317.5;
    const centerY = 108.5;
    const points: Point[] = [];
    for (let a = 0; a <= 2 * Math.PI; a += Number.parseFloat(element[CIRCLESTEP])) {
      const x = centerX + radiusX * Math.cos(a);
      const y = centerY + radiusY * Math.sin(a);
      points.push({x, y} as Point);
    }
    item.data[POINTS] = points;
    return item;
  }

  private addPointsFromCoords(item: StackItem): StackItem {
    const element = this.store.canvas.getObjects().find(it => it[ID] === item.id);
    item.data[POINTS] = [element.oCoords.mt, element.oCoords.br, element.oCoords.bl, element.oCoords.mt];
    return item;
  }

  private toRgba(hexString: string): Color {
    const color = hexRgb(hexString);
    return new Color(color.red / 255, color.green / 255, color.blue / 255, color.alpha);
  }
}


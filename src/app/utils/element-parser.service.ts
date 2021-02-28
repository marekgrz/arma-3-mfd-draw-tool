import { Injectable } from '@angular/core';
import {ElementType, StackItem} from '../components/left-side/layer-stack/elements/StackItem';
import {BaseShape} from '../common/BaseShape';
import {ClassGroup} from '../templates/ClassGroup';
import {Color} from '@angular-material-components/color-picker';
import {Line} from '../templates/Line';
import {Polygon} from '../templates/Polygon';
import {Point} from '../common/Point';
import {TreeService} from '../components/left-side/layer-stack/mat-tree/tree.service';
import {CIRCLESTEP, LINETYPE, POINTS} from '../common/ProjectFileStructure';

@Injectable({
  providedIn: 'root'
})
export class ElementParserService {

  constructor(private treeService: TreeService) { }

  public getMFDClass(): string {
    const bonesClass: ClassGroup = new ClassGroup();
    bonesClass.name = 'Bones';

    const drawClass: ClassGroup = new ClassGroup();
    drawClass.name = 'Draw';
    drawClass.content = this.convertToA3Format(this.treeService.itemList);

    const mfdClass: ClassGroup = new ClassGroup();
    mfdClass.name = 'MFD';
    mfdClass.content = [bonesClass, drawClass];

    return mfdClass.getElement();
  }

  private convertToA3Format(itemList: StackItem[]): BaseShape[] {
    const classList: BaseShape[] = [];
    itemList.forEach(item => {
      if (item.type === ElementType.group) {
        classList.push(this.createGroup(item, this.convertToA3Format(item.children)));
      } else {
        classList.push(this.resolveElement(item));
      }
    });
    return classList;
  }

  private resolveElement(item: StackItem): BaseShape {
    switch (item.type) {
      case ElementType.line: {
        return this.createLine(item);
      }
      case ElementType.circle: {
        return this.createLine(this.lineFromCircle(item));
      }
      case ElementType.rectangle: {
        return this.createLine(this.addPointsFromCoords(item));
      }
      case ElementType.triangle: {
        return this.createLine(this.addPointsFromCoords(item));
      }
      case ElementType.polygonRect: {
        return this.createPolygon(this.addPointsFromCoords(item));
      }
      case ElementType.polygonTriangle: {
        return this.createPolygon(this.addPointsFromCoords(item));
      }
    }
  }

  private createGroup(item: StackItem, content: BaseShape[]): ClassGroup {
    const classGroup: ClassGroup = new ClassGroup();
    classGroup.name = item.name;
    classGroup.color = new Color(1, 1, 1, 1);
    classGroup.condition = item.groupCondition;
    classGroup.blinking = item.groupBlinking;
    classGroup.blinkingPattern = item.groupBlinkingPattern;
    classGroup.blinkingStartsOn = item.groupBlinkingStartsOn;
    classGroup.clipTL = item.clipTL;
    classGroup.clipBR = item.clipBR;
    classGroup.clipTLParallax = item.clipTLParallax;
    classGroup.clipBRParallax = item.clipBRParallax;
    classGroup.content = content;
    return classGroup;
  }

  private createLine(item: StackItem): Line {
    const element = item.element;
    const line: Line = new Line();
    line.name = item.name;
    line.color = element.stroke as any;
    line.points = element.points;
    line.bone = 'Center';
    line.lineType = element[LINETYPE];
    line.width = Number(element.strokeWidth);
    return line;
  }

  private createPolygon(item: StackItem): Polygon {
    const element = item.element;
    const polygon: Polygon = new Polygon();
    polygon.name = item.name;
    polygon.color = element['texturePath'] ? undefined : element.fill as any;
    polygon.texturePath = element['texturePath'] ? element['texturePath'] : '';
    polygon.points = element.points;
    return polygon;
  }

  private lineFromCircle(item: StackItem): StackItem {
    const element = item.element;
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
    item.element[POINTS] = points;
    return item;
  }

  private addPointsFromCoords(item: StackItem): StackItem {
    const element = item.element;
    item.element[POINTS] = [element.oCoords.mt, element.oCoords.br, element.oCoords.bl, element.oCoords.mt];
    return item;
  }
}

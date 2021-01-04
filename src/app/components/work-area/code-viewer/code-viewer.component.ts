import { Component, OnInit } from '@angular/core';
import { TreeService } from '../../layer-stack/mat-tree/tree.service';
import { BaseShape } from '../../../common/BaseShape';
import { ClassGroup } from '../../../templates/ClassGroup';
import { Line } from '../../../templates/Line';
import { ElementType, StackItem } from '../../layer-stack/elements/StackItem';
import { Color } from '@angular-material-components/color-picker';
import { fabric } from 'fabric';
import { Polygon } from '../../../templates/Polygon';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnInit {

  constructor(private treeService: TreeService) {
  }

  ngOnInit(): void {
  }

  // MUST BE STRING
  getCode(): string {
    return this.getMFDClass();
  }

  convertToA3Format(itemList: StackItem[]): BaseShape[] {
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

  resolveElement(item: StackItem): BaseShape {
    switch (item.type) {
      case ElementType.line: {
        return this.createLine(item);
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

  createGroup(item: StackItem, content: BaseShape[]): ClassGroup {
    const classGroup: ClassGroup = new ClassGroup();
    classGroup.name = item.name;
    classGroup.color = new Color(1, 1, 1, 1);
    // classGroup.condition = 'user0 > 0';
    classGroup.content = content;
    return classGroup;
  }

  createLine(item: StackItem): Line {
    const element = item.element;
    const line: Line = new Line();
    line.name = item.name;
    line.color = element.stroke as any;
    line.points = element.points;
    line.bone = 'Center';
    line.lineType = element['lineType'];
    line.width = Number(element.strokeWidth);
    return line;
  }

  createPolygon(item: StackItem): Polygon {
    const element = item.element;
    console.log(element);
    const polygon: Polygon = new Polygon();
    polygon.name = item.name;
    polygon.color = element['texturePath'] ? undefined : element.fill as any;
    polygon.texturePath = element['texturePath'] ? element['texturePath'] : '';
    polygon.points = element.points;
    return polygon;
  }

  private addPointsFromCoords(item: StackItem): StackItem {
    const element = item.element;
    item.element['points'] = [element.oCoords.mt, element.oCoords.br, element.oCoords.bl, element.oCoords.mt];
    return item;
  }

  private getMFDClass(): string {
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

}

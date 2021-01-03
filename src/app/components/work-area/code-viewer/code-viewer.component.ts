import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';
import {BaseShape} from '../../../common/BaseShape';
import {ClassGroup} from '../../../templates/ClassGroup';
import {Color} from '../../../common/Color';
import {Line} from '../../../templates/Line';
import {ElementType, StackItem} from '../../layer-stack/elements/StackItem';
import {fabric} from 'fabric';

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
    return this.convertToA3Format(this.treeService.itemList).map(it => it.getElement('')).toString();
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
        return this.createLine(item.element);
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


  createLine(element: fabric.Polyline): Line {
    const line: Line = new Line();
    line.name = element.name;
    line.points = element.points;
    line.bone = 'Center';
    line.lineType = element['lineType'];
    line.width = Number(element.strokeWidth);
    return line;
  }

}

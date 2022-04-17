import { Component, ViewEncapsulation } from '@angular/core';
import { ItemType } from '../../../left-side/layer-stack-ng/elements/StackItem';

@Component({
  selector: 'mfd-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrls: ['./element-selector.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ElementSelectorComponent {

  searchValue = '';
  elementTypes: string[];
  allElementTypes = new Map([
    [ItemType.triangle.toString(), {label: 'Triangle', visible: true}],
    [ItemType.circle.toString(), {label: 'Circle', visible: true}],
    [ItemType.rectangle.toString(), {label: 'Rectangle', visible: true}],
    [ItemType.line.toString(), {label: 'Line', visible: true}],
    [ItemType.text.toString(), {label: 'Text field', visible: true}],
    [ItemType.texture.toString(), {label: 'Polygon (texture)', visible: true}],
    [ItemType.polygonRect.toString(), {label: 'Polygon (rectangle)', visible: true}],
    [ItemType.polygonTriangle.toString(), {label: 'Polygon (triangle)', visible: true}]
  ]);

  constructor() {
  }

  filterOptions(): void {
    this.allElementTypes.forEach(((value, key) => {
      value.visible = value.label.toLowerCase().includes(this.searchValue.toLowerCase());
    }));
  }
}

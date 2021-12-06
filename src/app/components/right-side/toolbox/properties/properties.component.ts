import { Component, OnInit } from '@angular/core';
import { TreeService } from '../../../left-side/layer-stack/mat-tree/tree.service';
import { ItemType, StackItem } from '../../../left-side/layer-stack/elements/StackItem';

@Component({
  selector: 'mfd-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.less']
})
export class PropertiesComponent implements OnInit {

  constructor(public treeService: TreeService) {
  }

  ngOnInit(): void {
  }

  isRoot(item: StackItem): boolean {
    return item.type === ItemType.root;
  }

  isGroup(item: StackItem): boolean {
    return item.type === ItemType.group;
  }

  isLine(item: StackItem): boolean {
    return item.type === ItemType.line;
  }

  isText(item: StackItem): boolean {
    return item.type === ItemType.text;
  }

  isRectangle(item: StackItem): boolean {
    return item.type === ItemType.rectangle;
  }

  isTexture(item: StackItem): boolean {
    return item.type === ItemType.texture;
  }

  isCircle(item: StackItem): boolean {
    return item.type === ItemType.circle;
  }

  isTriangle(item: StackItem): boolean {
    return item.type === ItemType.triangle;
  }

  isPolygonTriangle(item: StackItem): boolean {
    return item.type === ItemType.polygonTriangle;
  }

  isPolygonRectangle(item: StackItem): boolean {
    return item.type === ItemType.polygonRect;
  }
}

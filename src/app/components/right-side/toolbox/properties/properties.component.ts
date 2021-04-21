import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../../left-side/layer-stack/mat-tree/tree.service';
import {ElementType, StackItem} from '../../../left-side/layer-stack/elements/StackItem';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.less']
})
export class PropertiesComponent implements OnInit {

  constructor(public treeService: TreeService) {
  }

  ngOnInit(): void {
  }

  isRoot(item: StackItem): boolean {
    return item.type === ElementType.root;
  }

  isGroup(item: StackItem): boolean {
    return item.type === ElementType.group;
  }

  isLine(item: StackItem): boolean {
    return item.type === ElementType.line;
  }

  isText(item: StackItem): boolean {
    return item.type === ElementType.text;
  }

  isRectangle(item: StackItem): boolean {
    return item.type === ElementType.rectangle;
  }

  isTexture(item: StackItem): boolean {
    return item.type === ElementType.texture;
  }

  isCircle(item: StackItem): boolean {
    return item.type === ElementType.circle;
  }

  isTriangle(item: StackItem): boolean {
    return item.type === ElementType.triangle;
  }

  isPolygonTriangle(item: StackItem): boolean {
    return item.type === ElementType.polygonTriangle;
  }

  isPolygonRectangle(item: StackItem): boolean {
    return item.type === ElementType.polygonRect;
  }
}
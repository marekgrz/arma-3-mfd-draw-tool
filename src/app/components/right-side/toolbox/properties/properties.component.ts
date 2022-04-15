import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeService } from '../../../left-side/layer-stack-ng/tree.service';
import { ItemType, StackItem } from '../../../left-side/layer-stack-ng/elements/StackItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mfd-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.less']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  ready = false;
  selectedItem: StackItem;
  subscription: Subscription;

  constructor(public treeService: TreeService) {
    this.subscription = this.treeService.selectedItemChanged.subscribe(value => {
      this.ready = false;
      this.selectedItem = value;
      setTimeout(() => this.ready = value != null);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isRoot(item: StackItem): boolean {
    return item.itemType === ItemType.root;
  }

  isGroup(item: StackItem): boolean {
    return item.itemType === ItemType.group;
  }

  isLine(item: StackItem): boolean {
    return item.itemType === ItemType.line;
  }

  isText(item: StackItem): boolean {
    return item.itemType === ItemType.text;
  }

  isRectangle(item: StackItem): boolean {
    return item.itemType === ItemType.rectangle;
  }

  isTexture(item: StackItem): boolean {
    return item.itemType === ItemType.texture;
  }

  isCircle(item: StackItem): boolean {
    return item.itemType === ItemType.circle;
  }

  isTriangle(item: StackItem): boolean {
    return item.itemType === ItemType.triangle;
  }

  isPolygonTriangle(item: StackItem): boolean {
    return item.itemType === ItemType.polygonTriangle;
  }

  isPolygonRectangle(item: StackItem): boolean {
    return item.itemType === ItemType.polygonRect;
  }
}

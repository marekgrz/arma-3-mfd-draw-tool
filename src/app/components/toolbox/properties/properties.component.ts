import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';
import {ElementType, StackItem} from '../../layer-stack/elements/StackItem';

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

  isRectangle(item: StackItem): boolean {
    return item.type === ElementType.rectangle;
  }

  isTexture(item: StackItem): boolean {
    return item.type === ElementType.texture;
  }
}

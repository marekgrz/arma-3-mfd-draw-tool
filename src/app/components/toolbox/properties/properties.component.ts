import {AfterViewChecked, Component, OnInit} from '@angular/core';
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

  isGroup(item: StackItem): boolean {
    return item.type === ElementType.container;
  }
}

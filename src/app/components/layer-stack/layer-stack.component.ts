import {Component, OnInit} from '@angular/core';
import {generateId, ElementType, StackItem} from './elements/StackItem';
import {TreeService} from './mat-tree/tree.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less']
})
export class LayerStackComponent implements OnInit {

  groupIndex = 1;

  list: StackItem[] = [{
    id: generateId(),
    name: 'Top',
    type: ElementType.container,
    children: [
      {
        id: generateId(),
        name: 'Child',
        type: ElementType.element,
        children: null
      }
    ]
  },
    {
      id: generateId(),
      name: 'Location',
      type: ElementType.container,
      children: [
        {
          id: generateId(),
          name: 'Location 1',
          type: ElementType.element,
          children: null
        },
        {
          id: generateId(),
          name: 'Location 2',
          type: ElementType.element,
          children: null
        }
      ]
    }
  ];

  constructor(private treeService: TreeService) {
  }

  ngOnInit(): void {
  }

  createGroup(): void {
    if (this.treeService.getSelectedItem()) {
      this.wrapItemsInGroup();
    } else {
      this.list.push(this.newGroup());
    }
    this.groupIndex++;
  }

  private newGroup(): StackItem {
    const group = new StackItem();
    group.id = generateId();
    group.name = 'Group ' + this.groupIndex;
    group.type = ElementType.container;
    group.children = [];
    return group;
  }

  private wrapItemsInGroup(): StackItem {
    const group = this.newGroup();
    const children = [JSON.parse(JSON.stringify(this.treeService.getSelectedItem()))];
    this.treeService.getSelectedItem().name = group.name;
    this.treeService.getSelectedItem().id = group.id;
    this.treeService.getSelectedItem().type = group.type;
    this.treeService.getSelectedItem().children = children;
    return group;
  }
}

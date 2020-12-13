import {Component, OnInit} from '@angular/core';
import {generateId, NodeType, StackItem} from './StackItem';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less']
})
export class LayerStackComponent implements OnInit {

  selectedItem: StackItem;

  i = 1;

  list: StackItem[] = [{
    id: generateId(),
    name: 'Top',
    type: NodeType.container,
    children: [
      {
        id: generateId(),
        name: 'Child',
        type: NodeType.element,
        children: null
      }
    ]
  },
    {
      id: generateId(),
      name: 'Location',
      type: NodeType.container,
      children: [
        {
          id: generateId(),
          name: 'Location 1',
          type: NodeType.element,
          children: null
        },
        {
          id: generateId(),
          name: 'Location 2',
          type: NodeType.element,
          children: null
        }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  newGroup(): void {
    const group = new StackItem();
    group.id = generateId();
    group.name = 'Parent ' + this.i;
    group.type = NodeType.container;
    group.children = [];
    if (this.selectedItem) {
      this.wrapItemsInGroup(group);
    } else {
      this.list.push(group);
    }
    this.i++;
  }

  wrapItemsInGroup(group: StackItem): void {
    console.log(this.selectedItem);
    const index = this.list.findIndex(it => it.id === this.selectedItem.id);
    group.children = [this.list[index]];
    this.list[index] = group;
  }
}

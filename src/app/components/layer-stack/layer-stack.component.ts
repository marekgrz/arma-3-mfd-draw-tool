import {Component, OnInit} from '@angular/core';
import {TreeService} from './mat-tree/tree.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less']
})
export class LayerStackComponent implements OnInit {

  // list: StackItem[] = [{
  //   id: generateId(),
  //   name: 'Top',
  //   type: ElementType.group,
  //   children: [
  //     {
  //       id: generateId(),
  //       name: 'Child',
  //       type: ElementType.rectangle,
  //       children: null
  //     }
  //   ]
  // },
  //   {
  //     id: generateId(),
  //     name: 'Location',
  //     type: ElementType.group,
  //     children: [
  //       {
  //         id: generateId(),
  //         name: 'Location 1',
  //         type: ElementType.rectangle,
  //         children: null
  //       },
  //       {
  //         id: generateId(),
  //         name: 'Location 2',
  //         type: ElementType.rectangle,
  //         children: null
  //       }
  //     ]
  //   }
  // ];

  constructor(public treeService: TreeService) {
  }

  ngOnInit(): void {
  }
}

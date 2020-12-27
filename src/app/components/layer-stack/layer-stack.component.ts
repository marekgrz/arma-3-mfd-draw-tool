import {Component, OnInit} from '@angular/core';
import {TreeService} from './mat-tree/tree.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less']
})
export class LayerStackComponent implements OnInit {

  constructor(public treeService: TreeService) {
  }

  ngOnInit(): void {
  }
}

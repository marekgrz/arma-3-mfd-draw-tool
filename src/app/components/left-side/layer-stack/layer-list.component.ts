import {Component} from '@angular/core';
import {TreeService} from './mat-tree/tree.service';
import {InteractionService} from './mat-tree/interaction.service';

@Component({
  selector: 'mfd-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.less']
})
export class LayerListComponent {

  constructor(public treeService: TreeService,
              private interaction: InteractionService) {
  }

  deleteSelection(): void {
    this.interaction.onDeleteSelection();
  }
}
import {Component} from '@angular/core';
import {TreeService} from './mat-tree/tree.service';
import {InteractionService} from './mat-tree/interaction.service';

@Component({
  selector: 'mfd-layer-list',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less']
})
export class LayerStackComponent {

  constructor(public treeService: TreeService,
              private interaction: InteractionService) {
  }

  deleteSelection(): void {
    this.interaction.onDeleteSelection();
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService, TreeDragDropService } from 'primeng/api';
import { TreeService } from '../layer-stack/mat-tree/tree.service';
import { InteractionService } from '../layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-layer-stack',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less'],
  providers: [TreeDragDropService, MessageService],
})
export class LayerStackComponent implements OnInit {

  constructor(public treeService: TreeService, private interaction: InteractionService) {
  }

  ngOnInit(): void {}


  onSelectionChange(event): void {
    this.interaction.onItemInLayerStackSelected(this.treeService.selectedItem);
  }
}

import { Component } from '@angular/core';
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeService } from '../layer-stack/mat-tree/tree.service';
import { InteractionService } from '../layer-stack/mat-tree/interaction.service';
import { ItemType, StackItem } from '../layer-stack/elements/StackItem';

@Component({
  selector: 'mfd-layer-stack',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less'],
  providers: [TreeDragDropService, MessageService],
})
export class LayerStackComponent {

  constructor(public treeService: TreeService, private interaction: InteractionService) {
  }

  onSelectionChange(event): void {
    this.interaction.onItemInLayerStackSelected(this.treeService.selectedItem);
  }

  onNodeDrop(): void {
    this.refreshParents(this.treeService.itemList, null);
    this.interaction.refreshView();
  }

  onToggleVisibility(item: StackItem, groupVisibility: boolean = null): void {
    item.layerVisible = groupVisibility !== null ? groupVisibility : !item.layerVisible;
    if (item.data) {
      item.data.visible = item.layerVisible ? true : false;
    }
    if (item.itemType === ItemType.group) {
      item.children.forEach(it => this.onToggleVisibility(it, item.layerVisible));
    }
    this.interaction.refreshView(true);
  }

  private refreshParents(treeNode: TreeNode[], parent: TreeNode): void {
    for (const node of treeNode) {
      if (parent != null) {
        node.parent = parent;
      }
      if (node.children && node.children.length > 0) {
        this.refreshParents(node.children, node);
      }
    }
  }
}

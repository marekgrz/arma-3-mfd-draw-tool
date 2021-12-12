import { Component, OnInit } from '@angular/core';
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeService } from '../layer-stack/mat-tree/tree.service';
import { InteractionService } from '../layer-stack/mat-tree/interaction.service';
import { ItemType, StackItem } from '../layer-stack/elements/StackItem';
import { StoreService } from '../../../utils/store.service';

@Component({
  selector: 'mfd-layer-stack',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less'],
  providers: [TreeDragDropService, MessageService],
})
export class LayerStackComponent implements OnInit {

  constructor(public treeService: TreeService, private interaction: InteractionService, private store: StoreService) {
  }

  ngOnInit(): void {
  }


  onSelectionChange(event): void {
    this.interaction.onItemInLayerStackSelected(this.treeService.selectedItem);
  }

  onToggleVisibility(item: StackItem, groupVisibility = undefined): void {
    item.layerVisible = groupVisibility !== undefined ? groupVisibility : !item.layerVisible;
    if (item.data) {
      item.data.visible = item.layerVisible ? true : false;
    }
    if (item.itemType === ItemType.group) {
      item.children.forEach(it => this.onToggleVisibility(it, item.layerVisible));
    }
    this.interaction.refreshView();
  }

  //TODO add expand
  expandAll(): void {
    this.treeService.itemList.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll(): void {
    this.treeService.itemList.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}

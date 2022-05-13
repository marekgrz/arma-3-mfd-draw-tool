import { Component } from '@angular/core';
import { MenuItem, MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeService } from './tree.service';
import { InteractionService } from './interaction.service';
import { ItemType, StackItem } from './elements/StackItem';

@Component({
  selector: 'mfd-layer-stack',
  templateUrl: './layer-stack.component.html',
  styleUrls: ['./layer-stack.component.less'],
  providers: [TreeDragDropService, MessageService],
})
export class LayerStackComponent {

  items: MenuItem[];

  nodeRef: HTMLElement;

  constructor(public treeService: TreeService, private interaction: InteractionService) {
    this.items = [
      {label: 'Duplicate layer', icon: 'pi pi-copy', command: () => this.onContextMenuDuplicate()},
      {label: 'Hide', icon: 'pi pi-eye-slash', command: () => this.onContextMenuToggleVisibility()},
      {label: 'Remove', icon: 'pi pi-trash', command: () => this.onContextMenuDelete()}
    ];
  }

  onContextMenuShow(e: { node: StackItem}): void {
    this.items[1].label = e.node.layerVisible ? 'Hide' : 'Show';
    this.items[1].icon = e.node.layerVisible ? 'pi pi-eye-slash' : 'pi pi-eye';
    this.nodeRef = document.getElementById(e.node.id);
  }

  onSelectionChange(selection): void {
    if (selection.itemType === ItemType.group) {
      this.interaction.deselectCurrentItems();
      this.treeService.setSelectedItem(selection);
    }
    this.interaction.onItemInLayerStackSelected(this.treeService.selectedItem);
  }

  onNodeDrop(): void {
    this.refreshParents(this.treeService.itemList, null);
    this.treeService.refreshStackPosition();
    this.interaction.refreshView();
  }

  onToggleVisibility(item: StackItem, nodeRef = null, groupVisibility: boolean = null): void {
    item.layerVisible = groupVisibility !== null ? groupVisibility : !item.layerVisible;
    if (item.data) {
      item.data.visible = item.layerVisible ? true : false;
    }
    if (nodeRef) {
      nodeRef.parentElement.parentElement.parentElement.parentElement.style.opacity = item.layerVisible ? 1 : 0.5;
    }
    if (item.itemType === ItemType.group) {
      item.children.forEach(it => this.onToggleVisibility(it, null, item.layerVisible));
    }
    this.interaction.refreshView(true);
  }

  private onContextMenuDelete(): void {
    if (this.treeService.selectedItem) {
      this.interaction.onDeleteSelection();
    }
  }

  private onContextMenuDuplicate(): void {
    if (this.treeService.selectedItem) {
      this.interaction.onDuplicateSelection();
    }
  }

  private onContextMenuToggleVisibility(): void {
    if (this.treeService.selectedItem) {
      this.onToggleVisibility(this.treeService.selectedItem, this.nodeRef);
    }
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
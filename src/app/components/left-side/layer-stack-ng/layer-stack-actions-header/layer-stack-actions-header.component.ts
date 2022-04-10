import { Component } from '@angular/core';
import { TreeService } from '../tree.service';
import { InteractionService } from '../interaction.service';
import { TreeNode } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ProjectSettingsDialogModifyComponent } from '../../../dialogs/project-settings-dialog/project-settings-dialog-modify/project-settings-dialog-modify.component';

@Component({
  selector: 'mfd-layer-stack-actions-header',
  templateUrl: './layer-stack-actions-header.component.html',
  styleUrls: ['./layer-stack-actions-header.component.less']
})
export class LayerStackActionsHeaderComponent {

  constructor(public treeService: TreeService,
              private interaction: InteractionService,
              private dialog: MatDialog) {
  }

  onEditProjectSettings(): void {
    this.dialog.open(ProjectSettingsDialogModifyComponent);
  }

  onDeleteSelection(): void {
    if (this.treeService.selectedItem) {
      this.interaction.onDeleteSelection();
    }
  }

  onNewGroup(): void {
    this.treeService.createGroup();
    this.interaction.refreshView();
  }

  onExpandAll(): void {
    this.treeService.itemList.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  onCollapseAll(): void {
    this.treeService.itemList.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  onLocateElement(): void {
    this.expandParentsForItem(this.treeService.selectedItem);
    setTimeout(() => document.querySelector('.p-highlight').scrollIntoView(), 100);
  }

  private expandRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private expandParentsForItem(node: TreeNode): void {
    node.expanded = true;
    if (node.parent) {
      this.expandParentsForItem(node.parent);
    }
  }
}

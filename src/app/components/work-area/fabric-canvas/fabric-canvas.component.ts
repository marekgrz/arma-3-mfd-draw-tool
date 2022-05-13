import { AfterViewInit, Component, HostListener, Input, ViewChild } from '@angular/core';
import { StoreService } from '../../../utils/store.service';
import { FabricComponent } from 'ngx-fabric-wrapper';
import { TreeService } from '../../left-side/layer-stack-ng/tree.service';
import { InteractionService } from '../../left-side/layer-stack-ng/interaction.service';
import { fabric } from 'fabric';
import { BoneFixedModel } from '../../left-side/bones-list/BoneBaseModel';
import { BONE_NAME, ID } from '../../../common/ProjectFileStructure';
import { HistoryService } from '../../../utils/history.service';
import { ItemType, StackItem } from '../../left-side/layer-stack-ng/elements/StackItem';
import { LineUtilsService } from '../../right-side/toolbox/element-selector/element-types/line-type/line-utils.service';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { findByID } from '../../../common/Utils';
import { Point } from '../../../common/Point';

@Component({
  selector: 'mfd-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements AfterViewInit {

  @ViewChild(FabricComponent, {static: false}) componentRef?: FabricComponent;
  @ViewChild('contextMenu') contextMenu: ContextMenu;

  @Input()
  previewOnly: boolean;

  config = {
    fireRightClick: this
  };

  element: fabric.Object;

  snappingEnabled = false;

  loaded = false;

  SNAP_ANGLE = 5;

  STEP_ANGLE = 0.01;

  startPoint: Point;

  menuItems: MenuItem[];

  onKeyDown(event: KeyboardEvent): void {
    const callback = {
      Shift: () => this.enableSnapping(),
      ArrowLeft: () => this.translateObject(Direction.left),
      ArrowRight: () => this.translateObject(Direction.right),
      ArrowUp: () => this.translateObject(Direction.up),
      ArrowDown: () => this.translateObject(Direction.down),
    }[event.key];
    event.preventDefault();
    callback?.();
  }

  @HostListener('window:keyup', ['$event'])
  onDisableSnapping(event: KeyboardEvent): void {
    this.disableSnapping();
    if (event.key === 'Delete' && this.treeService.selectedItem) {
      this.deleteObject();
    }
  }

  deleteObject(): void {
    this.interaction.onDeleteSelection();
    this.element = null;
  }

  constructor(public store: StoreService,
              public treeService: TreeService,
              private interaction: InteractionService,
              private historyService: HistoryService,
              private lineUtils: LineUtilsService) {
    this.setupContextMenu();
    document.getElementById('workspaceContainer').addEventListener('keydown', (event) => this.onKeyDown(event));
  }

  ngAfterViewInit(): void {
    window.addEventListener('load', () => {
      this.setupCanvas();
      this.store.canvas.requestRenderAll();
      this.loaded = true;
    });
  }

  onSelected(elements): void {
    const elementIds = elements.selected.map(it => it.id);
    if (elementIds && elementIds.length > 0) {
      this.interaction.onItemInCanvasSelected(elementIds);
    }
    this.element = elements.selected[0];
  }

  onDeselected(): void {
    this.treeService.clearSelection();
    this.element = null;
  }

  onHighLighted(canvas): void {
    canvas.on('mouse:over', e => {
      if (e.target) {
        e.target.set('opacity', '0.5');
        canvas.renderAll();
      }
    });

    canvas.on('mouse:out', e => {
      if (e.target) {
        e.target.set('opacity', '1');
        canvas.renderAll();
      }
    });
  }

  onObjectMoving(e): void {
    const selectedItem = this.treeService.selectedItem;
    if (this.snappingEnabled) {
      if (Math.abs(this.startPoint.x - e.pointer.x) > Math.abs(this.startPoint.y - e.pointer.y)) {
        this.setAxisLock(false, true);
      } else {
        this.setAxisLock(true, false);
      }
    } else {
      this.setAxisLock(false, false);
    }

    if (!!selectedItem.base) {
      selectedItem.base.position.x = e.target.left;
      selectedItem.base.position.y = e.target.top;
      // has bone
      const bone = this.store.bones.find(it => it.name === selectedItem.data[BONE_NAME]) as BoneFixedModel;
      if (bone !== undefined) {
        selectedItem.base.position.x -= bone.pos0.x;
        selectedItem.base.position.y -= bone.pos0.y;
      }
    }
    if (selectedItem.itemType === ItemType.line) {
      selectedItem.data.hasBorders = true;
      this.lineUtils.recalculatePolyLinePointsPosition(selectedItem.data);
    }
  }

  onBeforeTransform(e): void {
    this.startPoint = Point.from(e.transform.ex, e.transform.ey);
  }

  onObjectModified(): void {
    const selectedItem = this.treeService.selectedItem;
    this.setAxisLock(false, false);
    if (selectedItem.itemType === ItemType.line) {
      selectedItem.data.hasBorders = true;
      this.lineUtils.recalculatePolyLineDimensions(selectedItem.data);
    }
    this.historyService.addSnapshot();
  }

  private setupContextMenu(): void {
    this.store.itemContextMenuOpened.subscribe((value: any) => {
      const item = findByID(value.target[ID], this.treeService.itemList);
      this.menuItems = [];
      this.menuItems = [
        {label: item.label, disabled: true},
        {label: 'Select', icon: 'pi pi-arrow-up-left', command: () => this.onContextMenuSelect(item)},
        {label: 'Duplicate layer', icon: 'pi pi-copy', command: () => this.onContextMenuDuplicate(item)},
        {label: 'Remove', icon: 'pi pi-trash', command: () => this.onContextMenuDelete(item)}
      ];
      this.contextMenu.show(value.e);
    });
  }

  private onContextMenuSelect(item: StackItem): void {
    this.interaction.onItemInLayerStackSelected(item);
  }

  private onContextMenuDelete(item: StackItem): void {
    this.interaction.onDeleteById(item.id);
  }

  private onContextMenuDuplicate(item: StackItem): void {
    this.interaction.onDuplicateItem(item);
  }

  private setupCanvas(): void {
    const canvas = this.componentRef.directiveRef.fabric();
    this.onHighLighted(canvas);
    this.store.canvas = canvas;
    this.store.canvas.setWidth(this.store.canvasWidth);
    this.store.canvas.setHeight(this.store.canvasHeight);
  }

  private enableSnapping(): void {
    this.snappingEnabled = true;
    if (this.element) {
      this.element.setOptions({snapAngle: this.SNAP_ANGLE});
    }
  }

  private translateObject(dir: Direction): void {
    if (!this.treeService.selectedItem) {
      return;
    }
    const element = this.treeService.selectedItem.data;
    switch (dir) {
      case Direction.up:
        element.top = element.top - 1;
        break;
      case Direction.down:
        element.top = element.top + 1;
        break;
      case Direction.left:
        element.left = element.left - 1;
        break;
      case Direction.right:
        element.left = element.left + 1;
        break;
    }
    this.interaction.refreshView();
  }

  private disableSnapping(): void {
    this.snappingEnabled = false;
    if (this.element) {
      this.element.setOptions({snapAngle: this.STEP_ANGLE});
    }
  }

  private setAxisLock(lockX: boolean, lockY: boolean): void {
    this.treeService.selectedItem.data.lockMovementX = lockX;
    this.treeService.selectedItem.data.lockMovementY = lockY;
  }
}

enum Direction {
  up,
  down,
  left,
  right
}

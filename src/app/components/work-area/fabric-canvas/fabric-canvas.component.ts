import { AfterViewInit, Component, HostListener, Input, ViewChild } from '@angular/core';
import { StoreService } from '../../../utils/store.service';
import { FabricComponent } from 'ngx-fabric-wrapper';
import { TreeService } from '../../left-side/layer-stack-ng/tree.service';
import { InteractionService } from '../../left-side/layer-stack-ng/interaction.service';
import { fabric } from 'fabric';
import { BoneFixedModel } from '../../left-side/bones-list/BoneBaseModel';
import { BONENAME } from '../../../common/ProjectFileStructure';
import { HistoryService } from '../../../utils/history.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'mfd-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements AfterViewInit {

  @ViewChild(FabricComponent, {static: false}) componentRef?: FabricComponent;

  @Input()
  previewOnly: boolean;

  config = {};

  element: fabric.Object;

  snappingEnabled = false;

  loaded = false;

  SNAP_ANGLE = 5;

  STEP_ANGLE = 0.01;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.enableSnapping();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onDisableSnapping(event: KeyboardEvent): void {
    this.disableSnapping();
    if (event.key === 'Delete' && this.treeService.selectedItem) {
      this.deleteObject(event);
    }
  }

  deleteObject(event: KeyboardEvent): void {
    if (event.key === 'Delete' && this.treeService.selectedItem) {
      this.interaction.onDeleteSelection();
      this.element = null;
    }
  }

  constructor(public store: StoreService,
              public treeService: TreeService,
              private interaction: InteractionService,
              private historyService: HistoryService) {
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
    if (!!selectedItem.base) {
      selectedItem.base.position.x = e.target.left / this.store.canvasWidth;
      selectedItem.base.position.y = e.target.top / this.store.canvasHeight;
      // has bone
      const bone = this.store.bones.find(it => it.name === selectedItem.data[BONENAME]) as BoneFixedModel;
      if (bone !== undefined) {
        selectedItem.base.position.x -= bone.pos0.x;
        selectedItem.base.position.y -= bone.pos0.y;
      }
    }
  }

  onObjectModified(): void {
    this.historyService.addSnapshot();
  }

  private setupCanvas(): void {
    const canvas = this.componentRef.directiveRef.fabric();
    this.onHighLighted(canvas);
    this.store.canvas = canvas;
    this.store.canvas.setWidth(this.store.canvasWidth);
    this.store.canvas.setHeight(this.store.canvasHeight);
  }

  private enableSnapping(): void {
    if (this.element) {
      this.element.setOptions({snapAngle: this.SNAP_ANGLE});
    }
  }

  private disableSnapping(): void {
    if (this.element) {
      this.element.setOptions({snapAngle: this.STEP_ANGLE});
    }
  }
}

import {AfterViewInit, Component, HostListener, Input, ViewChild} from '@angular/core';
import {StoreService} from '../../../utils/store.service';
import {FabricComponent} from 'ngx-fabric-wrapper';
import {TreeService} from '../../left-side/layer-stack/mat-tree/tree.service';
import {InteractionService} from '../../left-side/layer-stack/mat-tree/interaction.service';
import {fabric} from 'fabric';
import {ElementType} from '../../left-side/layer-stack/elements/StackItem';

@Component({
  selector: 'app-fabric-canvas',
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
  onActivateSnapping(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.snappingEnabled = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onDisableSnapping(event: KeyboardEvent): void {
    this.snappingEnabled = false;
  }

  @HostListener('mousemove')
  onRotateObject(): void {
    if (this.element) {
      this.element.setOptions({snapAngle: this.snappingEnabled ? this.SNAP_ANGLE : this.STEP_ANGLE});
    }
  }

  @HostListener('document:keyup', ['$event'])
  deleteObject(event: KeyboardEvent): void {
    if (event.key === 'Delete' && this.treeService.selectedItem) {
      this.interaction.onDeleteSelection();
      this.element = null;
    }
  }

  constructor(public store: StoreService,
              public treeService: TreeService,
              private interaction: InteractionService) {
  }

  ngAfterViewInit(): void {
    window.addEventListener('load', () => {
      this.setupCanvas();
      this.store.canvas.requestRenderAll();
      this.loaded = true;
    });
  }

  private setupCanvas(): void {
    const canvas = this.componentRef.directiveRef.fabric();
    this.onSelected(canvas);
    this.onDeselected(canvas);
    this.onHighLighted(canvas);
    this.store.canvas = canvas;
    this.store.canvas.setWidth(this.store.canvasWidth);
    this.store.canvas.setHeight(this.store.canvasHeight);
  }

  private onDeselected(canvas): void {
    canvas.on('before:selection:cleared', () => {
      this.interaction.deselectCurrentItems();
    });
  }

  private onSelected(canvas): void {
    const selectionHandler = () => {
      const elementIds = canvas.getActiveObjects().map(it => it.id);
      if (elementIds && elementIds.length > 0) {
        this.interaction.onItemInCanvasSelected(elementIds);
      }
    };
    canvas.on('selection:created', selectionHandler);
    canvas.on('selection:updated', selectionHandler);
  }

  private onHighLighted(canvas): void {
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
}

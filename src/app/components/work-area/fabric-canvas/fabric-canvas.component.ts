import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {StoreService} from '../../../utils/store.service';
import {FabricComponent} from 'ngx-fabric-wrapper';
import {Object} from 'fabric/fabric-impl';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements AfterViewInit {

  @ViewChild(FabricComponent, {static: false}) componentRef?: FabricComponent;

  config = {};

  element: Object;

  snappingEnabled = false;

  SNAP_ANGLE = 15;

  @HostListener('document:keydown', ['$event'])
  activateSnapping(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.snappingEnabled = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  disableSnapping(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.snappingEnabled = false;
    }
  }

  @HostListener('mousemove')
  rotateObject(): void {
    if (this.element) {
      this.element.setOptions({snapAngle: this.snappingEnabled ? this.SNAP_ANGLE : 0.1});
    }
  }

  @HostListener('document:keyup', ['$event'])
  deleteObject(event: KeyboardEvent): void {
    if (event.key === 'Delete' && this.element) {
      if (this.element.group) {
        this.element.group._objects.forEach(it => this.store.canvas.remove(it));
      }
      this.store.canvas.remove(this.element);
      this.treeService.deleteById(this.element['id']);
      this.element = null;
    }
  }

  constructor(public store: StoreService,
              public treeService: TreeService) {
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.componentRef.directiveRef.fabric();
    this.onSelected(canvas);
    this.onDeselected(canvas);
    this.lockStrokeWidth(canvas);
    this.store.canvas = canvas;
    this.store.canvas.setWidth(this.store.canvasWidth);
    this.store.canvas.setHeight(this.store.canvasHeight);
  }

  private lockStrokeWidth(canvas): void {
    canvas.on('object:scaling', e => {
      const o = e.target;
      if (!o.strokeWidthUnscaled && o.strokeWidth) {
        o.strokeWidthUnscaled = o.strokeWidth;
      }
      if (o.strokeWidthUnscaled) {
        o.strokeWidth = o.strokeWidthUnscaled / o.scaleX;
      }
    });
  }

  private onDeselected(canvas): void {
    canvas.on('before:selection:cleared', () => {
      this.treeService.deselectCurrentItems();
    });
  }

  private onSelected(canvas): void {
    const selectionHandler = () => {
      const elementIds = canvas.getActiveObjects().map(it => it.id);
      if (elementIds && elementIds.length > 0) {
        this.treeService.onItemInCanvasSelected(elementIds);
      }
    };
    canvas.on('selection:created', selectionHandler);
    canvas.on('selection:updated', selectionHandler);
  }
}

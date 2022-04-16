import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { StoreService } from '../../utils/store.service';
import { TreeService } from '../left-side/layer-stack-ng/tree.service';

@Component({
  selector: 'mfd-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.less']
})
export class WorkAreaComponent implements AfterViewInit, OnDestroy {

  @ViewChild('workspaceContainer') workspaceContainer: ElementRef;
  @ViewChild('workspace') workspace: ElementRef;

  @Output()
  showDesigner: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  showPreview: EventEmitter<any> = new EventEmitter<any>();

  viewMode: 'design' | 'text' | 'preview' = 'design';
  ZOOM_LEVEL = 1;
  ZOOM_STEP = 0.1;
  private subscriptions: Subscription[] = [];
  private mouseMoveSubscription;

  private mouseClickPosition = [];
  private startPosition = [0, 0];
  private offsetPosition = [0, 0];

  constructor(public store: StoreService,
              private treeService: TreeService) {
  }

  ngAfterViewInit(): void {
    this.subscriptions = [
      fromEvent(this.workspaceContainer.nativeElement, 'wheel').subscribe((e: MouseEvent) => this.onScroll(e)),
      fromEvent(this.workspaceContainer.nativeElement, 'mousedown').subscribe((e: MouseEvent) => this.onMouseDown(e)),
      fromEvent(this.workspaceContainer.nativeElement, 'mouseup').subscribe(_ => this.onMouseUp()),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(it => it.unsubscribe());
  }

  resetZoom(): void {
    this.ZOOM_LEVEL = 1;
    this.offsetPosition = [0, 0];
    this.updatePositionAndScale();
  }

  zoomIn(): void {
    this.ZOOM_LEVEL += this.ZOOM_STEP;
    this.updatePositionAndScale();
  }

  zoomOut(): void {
    this.ZOOM_LEVEL -= this.ZOOM_STEP;
    this.updatePositionAndScale();
  }

  deselectAll(event): void {
    if (event.target.id === 'workspaceContainer') {
      this.store.canvas.discardActiveObject().renderAll();
      this.treeService.clearSelection();
    }
  }

  private onScroll(e): void {
    if (e.ctrlKey) {
      e.deltaY < 0 ? this.zoomIn() : this.zoomOut();
    }
  }

  private onMouseDown(e: MouseEvent): void {
    if (e.button === 1) {
      this.mouseClickPosition = [e.clientX, e.clientY];
      this.startPosition = [...this.offsetPosition];
      e.preventDefault();
      this.mouseMoveSubscription = fromEvent(this.workspaceContainer.nativeElement, 'mousemove')
        .subscribe((mouseEvent: MouseEvent) => this.onMouseMove(mouseEvent));
    }
  }

  private onMouseUp(): void {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
  }

  private onMouseMove(e: MouseEvent): void {
    this.offsetPosition[0] = this.startPosition[0] - (this.mouseClickPosition[0] - e.clientX);
    this.offsetPosition[1] = this.startPosition[1] - (this.mouseClickPosition[1] - e.clientY);
    this.updatePositionAndScale();
  }

  private updatePositionAndScale(): void {
    this.workspace.nativeElement.style.transform = `translate(${this.offsetPosition[0]}px,${this.offsetPosition[1]}px) scale(${this.ZOOM_LEVEL})`;
  }
}

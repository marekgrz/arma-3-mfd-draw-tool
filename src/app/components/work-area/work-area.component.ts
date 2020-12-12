import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.less']
})
export class WorkAreaComponent implements AfterViewInit {

  @ViewChild('workspaceContainer') workspaceContainer: ElementRef;
  @ViewChild('workspace') workspace: ElementRef;
  ZOOM_LEVEL = 1;
  ZOOM_STEP = 0.05;
  private subscriptions: Subscription[] = [];

  private middleMouseDown = false;
  private mouseClickPosition = [];
  private startPosition = [0, 0];
  private offsetPosition = [0, 0];

  constructor() {
  }

  ngAfterViewInit(): void {

    this.subscriptions.concat(
      [
        fromEvent(this.workspaceContainer.nativeElement, 'wheel').subscribe((e: MouseEvent) => this.onScroll(e)),
        fromEvent(this.workspaceContainer.nativeElement, 'mousedown').subscribe((e: MouseEvent) => this.onMouseDown(e)),
        fromEvent(this.workspaceContainer.nativeElement, 'mouseup').subscribe(_ => this.onMouseUp()),
        fromEvent(this.workspaceContainer.nativeElement, 'mousemove').subscribe((e: MouseEvent) => this.onMouseMove(e)),
      ]
    );
  }

  onScroll(e): void {
    if (e.ctrlKey) {
      this.ZOOM_LEVEL += e.deltaY < 0 ? this.ZOOM_STEP : -this.ZOOM_STEP;
      this.updatePositionAndScale();
    }
  }

  onMouseDown(e: MouseEvent): void {
    if (e.button === 1) {
      this.middleMouseDown = true;
      this.mouseClickPosition = [e.clientX, e.clientY];
      this.startPosition = [...this.offsetPosition];
    }
  }

  onMouseUp(): void {
    this.middleMouseDown = false;
  }

  onMouseMove(e: MouseEvent): void {
    if (this.middleMouseDown) {
      this.offsetPosition[0] = this.startPosition[0] - (this.mouseClickPosition[0] - e.clientX);
      this.offsetPosition[1] = this.startPosition[1] - (this.mouseClickPosition[1] - e.clientY);
      this.updatePositionAndScale();
    }
  }

  updatePositionAndScale(): void {
    this.workspace.nativeElement.style.transform = `translate(${this.offsetPosition[0]}px,${this.offsetPosition[1]}px) scale(${this.ZOOM_LEVEL})`;
  }
}

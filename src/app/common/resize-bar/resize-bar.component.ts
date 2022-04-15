import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'mfd-resize-bar',
  templateUrl: './resize-bar.component.html',
  styleUrls: ['./resize-bar.component.less']
})
export class ResizeBarComponent implements AfterViewInit {

  @ViewChild('resizeBar') resizeBar: ElementRef;

  @Input()
  maximumWidth = 900;

  @Input()
  minimumWidth = 200;

  @Input()
  horizontal = false;

  @Input()
  panelName: string = undefined;

  private container: HTMLDivElement;

  private subscription: Subscription;

  private isLast = false;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.container = this.resizeBar.nativeElement.parentNode.parentNode;
    this.isLast = this.resizeBar.nativeElement.parentNode.nextSibling == null;
    this.loadSavedSize();
  }

  onMouseDown(): void {
    this.subscription = fromEvent(document, 'mousemove').subscribe((e: MouseEvent) => this.onMouseMove(e));
    fromEvent(document, 'mouseup').subscribe((e: MouseEvent) => this.onMouseUp());
  }

  onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    const distance = this.calculateDistance(event);
    this.savePanelSize(distance);
    if (this.horizontal) {
      this.container.style.height = `${distance}px`;
    } else {
      this.container.style.width = `${distance}px`;
    }
  }

  onMouseUp(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateDistance(event: MouseEvent): number {
    const mousePos = this.horizontal ? event.y - 30 : event.x;
    if (this.isLast) {
      return mousePos > this.maximumWidth
        ? this.maximumWidth
        : mousePos < this.minimumWidth ? this.minimumWidth : mousePos;
    }

    const edgeOfWindow = this.horizontal ? innerHeight : innerWidth;
    return (edgeOfWindow - mousePos) > this.maximumWidth
      ? this.maximumWidth
      : (edgeOfWindow - mousePos) < this.minimumWidth ? this.minimumWidth : (edgeOfWindow - mousePos);
  }

  private savePanelSize(size: number): void {
    if (this.panelName) {
      localStorage.setItem(`panel_${this.panelName}_size`, size.toString());
    }
  }

  private loadSavedSize(): void {
    if (this.panelName) {
      const size = localStorage.getItem(`panel_${this.panelName}_size`);
      if (size) {
        if (this.horizontal) {
          this.container.style.height = `${size}px`;
        } else {
          this.container.style.width = `${size}px`;
        }
      }
    }
  }
}

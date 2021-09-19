import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

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

  private container: HTMLDivElement;

  private resizeEnabled = false;

  private isLast = false;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.container = this.resizeBar.nativeElement.parentNode.parentNode;
    this.isLast = this.resizeBar.nativeElement.parentNode.nextSibling == null;
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.resizeEnabled = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.resizeEnabled) {
      event.preventDefault();
      if (this.horizontal) {
        this.container.style.height = `${this.calculateDistance(event)}px`;
      } else {
        this.container.style.width = `${this.calculateDistance(event)}px`;
      }
    }
  }

  private calculateDistance(event: MouseEvent): number {
    const mousePos = this.horizontal ? event.y : event.x;
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

  onMouseDown(): void {
    this.resizeEnabled = true;
  }
}

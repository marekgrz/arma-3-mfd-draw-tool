import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { PersistenceService } from '../../utils/persistence.service';

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

  private panelSize = 0;

  constructor(private persistenceService: PersistenceService) {
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
    this.panelSize = distance;
    if (this.horizontal) {
      this.container.style.height = `${distance}px`;
    } else {
      this.container.style.width = `${distance}px`;
    }
  }

  onMouseUp(): void {
    this.savePanelSize(this.panelSize);
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
      this.persistenceService.setPanelSize(this.panelName, size);
    }
  }

  private async loadSavedSize(): Promise<void> {
    if (this.panelName) {
      const size = await this.persistenceService.getPanelSize(this.panelName);
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

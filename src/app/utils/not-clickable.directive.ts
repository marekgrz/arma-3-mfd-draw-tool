import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[notClickable]'
})
export class NotClickableDirective implements OnChanges {

  @Input() notClickable: boolean;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notClickable) {
      if (this.notClickable) {
        this.elementRef.nativeElement.style.pointerEvents = 'none';
      } else {
        this.elementRef.nativeElement.style.pointerEvents = 'all';
      }
    }
  }
}

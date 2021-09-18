import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mfd-position-input',
  templateUrl: './position-input.component.html',
  styleUrls: ['./position-input.component.less']
})
export class PositionInputComponent {

  @Input() positionX: number;

  @Output() positionXChange = new EventEmitter<number>();

  @Input() positionY: number;

  @Output() positionYChange = new EventEmitter<number>();

  @Output() save = new EventEmitter<void>();

  constructor() {}
}

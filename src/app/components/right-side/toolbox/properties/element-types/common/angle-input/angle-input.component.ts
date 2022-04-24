import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mfd-angle-input',
  templateUrl: './angle-input.component.html',
  styleUrls: ['./angle-input.component.less']
})
export class AngleInputComponent {

  _angle: number;

  @Input()
  initialValue: number;

  @Input()
  set angle(value: number) {
    this._angle = value;
  }

  @Output() angleChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor() {
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mfd-stroke-width-input',
  templateUrl: './stroke-width-input.component.html',
  styleUrls: ['./stroke-width-input.component.less']
})
export class StrokeWidthInputComponent {

  _width: string;

  @Input()
  set width(value: string) {
    this._width = value;
  }

  @Output() widthChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor() {
  }
}

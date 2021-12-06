import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mfd-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.less']
})
export class ColorSelectorComponent implements OnInit {

  @Input()
  color: string;

  @Output()
  colorChange: EventEmitter<string> = new EventEmitter<string>();

  private startValue;

  constructor() {
  }

  ngOnInit(): void {
    this.startValue = this.color.slice();
  }

  onColorChanged(): void {
    if (this.color !== this.startValue) {
      this.colorChange.emit(this.color);
    }
  }
}

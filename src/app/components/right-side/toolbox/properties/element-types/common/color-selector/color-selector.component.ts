import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mfd-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ColorSelectorComponent implements OnInit {

  @Input()
  colorHex: string;

  @Output()
  colorHexChange: EventEmitter<string> = new EventEmitter<string>();

  private startValue;

  constructor() {
  }

  ngOnInit(): void {
    this.startValue = this.colorHex.slice();
  }

  onColorChanged(): void {
    if (this.colorHex !== this.startValue) {
      this.colorHexChange.emit(this.colorHex);
    }
  }
}

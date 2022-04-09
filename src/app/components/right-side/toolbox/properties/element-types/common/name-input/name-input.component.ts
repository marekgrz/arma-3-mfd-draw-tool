import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mfd-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.less']
})
export class NameInputComponent {

  _name: string;
  _initialValue: string;

  @Input()
  set name(value: string) {
    this._name = value;
    this._initialValue = value;
  }

  @Output() nameChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor() {
  }

  updateIfNeeded(): void {
    if (this._name !== this._initialValue) {
      this.nameChange.emit(this._name);
      this.save.emit();
    }
  }
}

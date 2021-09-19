import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mfd-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.less']
})
export class NameInputComponent {

  @Input() name: string;

  @Output() nameChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor() {
  }
}

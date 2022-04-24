import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreService } from '../../../../../../../utils/store.service';
import { LineType } from '../../../../../../../templates/Line';

@Component({
  selector: 'mfd-line-type-selector',
  templateUrl: './line-type-selector.component.html',
  styleUrls: ['./line-type-selector.component.less']
})
export class LineTypeSelectorComponent {

  _lineType: LineType;

  @Input()
  set lineType(value: LineType) {
    this._lineType = value;
  }

  @Output() lineTypeChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor(public store: StoreService) {
  }
}

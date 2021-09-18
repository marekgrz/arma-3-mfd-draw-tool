import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreService } from '../../../../../../../utils/store.service';

@Component({
  selector: 'mfd-bones-selector',
  templateUrl: './bones-selector.component.html',
  styleUrls: ['./bones-selector.component.less']
})
export class BonesSelectorComponent {

  @Input() ngModel: string;

  @Output() ngModelChange = new EventEmitter<string>();

  @Output() save = new EventEmitter<void>();

  constructor(public store: StoreService) {
  }
}

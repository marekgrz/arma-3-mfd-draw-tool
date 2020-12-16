import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StackItem} from '../elements/StackItem';

@Component({
  selector: 'app-mat-tree',
  templateUrl: './mat-tree.component.html',
  styleUrls: ['./mat-tree.component.less']
})
export class MatTreeComponent implements OnInit {

  @Input() list: StackItem[];

  @Output() selectedItem: EventEmitter<StackItem> = new EventEmitter<StackItem>();

  selectedObject(item: StackItem): void {
    console.log(item);
    this.selectedItem.emit(item);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}

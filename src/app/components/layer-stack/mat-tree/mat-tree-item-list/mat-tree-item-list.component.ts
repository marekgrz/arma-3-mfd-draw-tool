import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeType, StackItem} from '../../StackItem';

@Component({
  selector: 'app-mat-tree-item-list',
  templateUrl: './mat-tree-item-list.component.html',
  styleUrls: ['./mat-tree-item-list.component.less']
})
export class MatTreeItemListComponent implements OnInit {

  @Input() item: StackItem;

  @Input() isRoot: boolean;

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  options: any = {
    group: 'test',
    onUpdate: () => {

    },
    onAdd: () => {

    },
    onRemove: () => {

    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  selectItem(event): void {
    console.log(this.item);
    this.removeExistingSelectionStyle();
    event.target.parentElement.classList.add('selected-item');
    this.selected.emit(this.item);
  }

  removeExistingSelectionStyle(): void {
    const elements = document.querySelectorAll('.selected-item');
    elements.forEach(el => el.classList.remove('selected-item'));
  }

  emit(): void {
    this.selected.emit(this.item);
  }

  isContainer(item: StackItem): boolean {
    return item.type === NodeType.container;
  }
}

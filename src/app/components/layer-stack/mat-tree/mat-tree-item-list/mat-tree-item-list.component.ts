import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ElementType, StackItem} from '../../elements/StackItem';
import {TreeService} from '../tree.service';

@Component({
  selector: 'app-mat-tree-item-list',
  templateUrl: './mat-tree-item-list.component.html',
  styleUrls: ['./mat-tree-item-list.component.less']
})
export class MatTreeItemListComponent implements OnInit {

  renaming = false;

  temporaryName: string;

  @Input() item: StackItem;

  @Input() isRoot: boolean;

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  expanded = true;

  options: any = {
    group: 'layer-stack',
    onUpdate: () => {

    },
    onAdd: () => {

    },
    onRemove: () => {

    },
  };

  constructor(private treeService: TreeService) {
  }

  ngOnInit(): void {
    this.temporaryName = '' + this.item.name;
  }

  @HostListener('document:dblclick')
  clickOutside(): void {
    this.treeService.setSelectedItem(null);
    this.removeExistingSelectionStyle();
  }

  onKeydownHandler(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' && this.renaming) {
        this.renaming = false;
        this.item.name = '' + this.temporaryName;
    }
    if (evt.key === 'Escape') {
      this.renaming = false;
      this.temporaryName = '' + this.item.name;
    }
  }

  selectItem(event): void {
    const element = event.target.classList.contains('row') ? event.target.parentElement : event.target.parentElement.parentElement;
    this.removeExistingSelectionStyle();
    this.treeService.setSelectedItem(this.item);
    element.classList.add('selected-item');
    event.stopPropagation();
  }

  isContainer(item: StackItem): boolean {
    return item.type === ElementType.container;
  }

  toggleExpand(event: Event): void {
    this.expanded = !this.expanded;
    event.stopPropagation();
  }

  private removeExistingSelectionStyle(): void {
    const elements = document.querySelectorAll('.selected-item');
    elements.forEach(el => el.classList.remove('selected-item'));
  }
}

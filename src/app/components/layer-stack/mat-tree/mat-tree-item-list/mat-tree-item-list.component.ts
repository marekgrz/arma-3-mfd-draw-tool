import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    if (this.isRoot) {
      this.item.type = ElementType.root;
    }
    this.temporaryName = '' + this.item.name;
  }

  hasSomeParentTheClass(element, classname): boolean {
    if (!element.parentNode) {
      return false;
    }
    if (element.className.split(' ').indexOf(classname) >= 0) {
      return true;
    }
    return this.hasSomeParentTheClass(element.parentNode, classname);
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

  selectRootSettings(event): void {
    const element = event.target;
    this.treeService.deselectCurrentItems();
    this.treeService.selectedItem = this.item;
    element.classList.add('selected-root');
    event.stopPropagation();
  }

  selectItem(): void {
    // const element = event.target.classList.contains('row') ? event.target.parentElement : event.target.parentElement.parentElement;
    const element = document.getElementById(this.item.id);
    this.treeService.deselectCurrentItems();
    this.treeService.selectedItem = this.item;
    this.treeService.selectItemInCanvas();
    element.classList.add('selected-item');
    event.stopPropagation();
  }

  isContainer(item: StackItem): boolean {
    return item.type === ElementType.group;
  }

  toggleExpand(event: Event): void {
    this.expanded = !this.expanded;
    event.stopPropagation();
  }


}

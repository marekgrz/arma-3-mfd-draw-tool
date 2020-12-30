import {Injectable} from '@angular/core';
import {ElementType, StackItem} from '../elements/StackItem';
import {Line, Rect} from 'fabric/fabric-impl';
import {fabric} from 'fabric';
import {StoreService} from '../../../utils/store.service';
import {deleteElementById, findByID, flattenList} from '../../../common/Utils';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  selectedItem: StackItem;

  itemList: StackItem[] = [];

  private rectangleIndex = 1;
  private textureIndex = 1;
  private lineIndex = 1;
  private groupIndex = 1;

  constructor(public store: StoreService) {
  }

  refreshStackPosition(): void {
    let index = 1;
    const flatItemList = flattenList(this.itemList).filter(el => el.type !== ElementType.group);
    const objects = this.store.canvas.getObjects();
    flatItemList.map(item => {
      objects.find(obj => obj['id'] === item.id)
        .moveTo(index);
      index++;
    });
  }

  itemFromLine(line: Line): StackItem {
    const item = new StackItem();
    item.id = line['id'];
    item.name = 'Line_' + this.lineIndex++;
    item.type = ElementType.line;
    item.element = line;
    item.children = null;
    return item;
  }

  itemFromRectangle(rectangle: Rect): StackItem {
    const item = new StackItem();
    item.id = rectangle['id'];
    item.name = 'Rectangle_' + this.rectangleIndex++;
    item.type = ElementType.rectangle;
    item.element = rectangle;
    item.children = null;
    return item;
  }

  itemFromTexture(texture: fabric.Image): StackItem {
    const item = new StackItem();
    item.id = texture['id'];
    item.name = 'Texture_' + this.textureIndex++;
    item.type = ElementType.texture;
    item.element = texture;
    item.children = null;
    return item;
  }

  createGroup(): void {
    // if (this.selectedItem && this.selectedItem.type !== ElementType.root) {
    //   this.wrapItemsInGroup();
    // } else {
    //
    // }
    this.itemList.push(this.newGroup());
    this.groupIndex++;
  }

  deleteItemByID(id: string): void {
    this.itemList.forEach(it => deleteElementById(it, id));
    this.itemList = this.itemList.filter(it => it.id !== id);
  }

  pushToListInCorrectPlace(item: StackItem): void {
    this.itemList.push(item);
    // if (!this.selectedItem || !this.selectedItem.parent) {
    //   //isRoot
    //   this.itemList.push(item);
    // } else {
    //   this.selectedItem.type === ElementType.group
    //     ? this.selectedItem.children.push(item)
    //     : this.selectedItem.parent.children.push(item);
    // }
  }

  private newGroup(): StackItem {
    const group = new StackItem();
    group.name = 'Group_' + this.groupIndex;
    group.type = ElementType.group;
    group.element = undefined;
    return group;
  }

  // UNUSED YET
  updateItemParent(itemID: string, newParentID: string): void {
    const selectedItem = findByID(itemID, this.itemList);
    selectedItem.parent = findByID(newParentID, this.itemList);
  }

  private wrapItemsInGroup(): void {
    const group = this.newGroup();
    const children = [Object.assign({}, this.selectedItem)];
    this.selectedItem.name = group.name;
    this.selectedItem.id = group.id;
    this.selectedItem.element = group.element;
    this.selectedItem.type = group.type;
    this.selectedItem.children = children;
  }
}

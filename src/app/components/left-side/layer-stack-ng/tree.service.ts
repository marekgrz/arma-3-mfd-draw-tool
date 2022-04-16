import { EventEmitter, Injectable } from '@angular/core';
import { ItemType, StackItem } from './elements/StackItem';
import { Circle, Polyline, Rect, Triangle } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { StoreService } from '../../../utils/store.service';
import { deleteElementById, findByID, flattenList } from '../../../common/Utils';
import { ID } from '../../../common/ProjectFileStructure';
import { Builder } from 'builder-pattern';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  selectedItem: StackItem;
  selectedItemChanged: EventEmitter<StackItem> = new EventEmitter<StackItem>();

  itemList: StackItem[] = [];

  private rectangleIndex = 1;
  private textureIndex = 1;
  private lineIndex = 1;
  private groupIndex = 1;
  private circleIndex = 1;
  private polygonRectangleIndex = 1;
  private polygonTriangleIndex = 1;
  private triangleIndex = 1;
  private textIndex = 1;

  constructor(public store: StoreService) {
  }

  setSelectedItem(item: StackItem): void {
    this.clearSelection();
    this.selectedItem = item;
    this.selectedItemChanged.emit(this.selectedItem);
  }

  clearSelection(): void {
    this.selectedItem = null;
  }

  resetProjectStack(): void {
    this.selectedItem = undefined;
    this.itemList = [];
  }

  refreshStackPosition(): void {
    let index = 1;
    const flatItemList = flattenList(this.itemList).filter(el => el.itemType !== ItemType.group);
    const objects = this.store.canvas.getObjects();
    flatItemList.map(item => {
      objects.find(obj => obj[ID] === item.id)
        .moveTo(index);
      index++;
    });
  }

  refreshItemListFromCanvas(canvas: fabric.Canvas): void {
    const elements: fabric.Object[] = canvas.getObjects();
    elements.forEach(element => {
      findByID(element[ID], this.itemList).data = element;
    });
  }

  itemFromLine(line: Polyline): StackItem {
    return Builder(StackItem)
      .id(line[ID])
      .label('Line_' + this.lineIndex++)
      .itemType(ItemType.line)
      .data(line)
      .children(null)
      .icon('material-icons-outlined line')
      .build();
  }

  itemFromRectangle(rectangle: Rect): StackItem {
    return Builder(StackItem)
      .id(rectangle[ID])
      .label('Rectangle_' + this.rectangleIndex++)
      .itemType(ItemType.rectangle)
      .data(rectangle)
      .children(null)
      .icon('material-icons-outlined rectangle')
      .build();
  }

  itemFromText(text: fabric.Text): StackItem {
    return Builder(StackItem)
      .id(text[ID])
      .label('TextElement_' + this.textIndex++)
      .itemType(ItemType.text)
      .data(text)
      .children(null)
      .icon('material-icons-outlined text')
      .build();
  }

  itemFromTriangle(triangle: Triangle): StackItem {
    return Builder(StackItem)
      .id(triangle[ID])
      .label('Triangle' + this.triangleIndex++)
      .itemType(ItemType.triangle)
      .data(triangle)
      .children(null)
      .icon('material-icons-outlined triangle')
      .build();
  }

  itemFromCircle(circle: Circle): StackItem {
    return Builder(StackItem)
      .id(circle[ID])
      .label('Circle_' + this.circleIndex++)
      .itemType(ItemType.circle)
      .data(circle)
      .children(null)
      .icon('material-icons-outlined circle')
      .build();
  }

  itemFromPolygonRectangle(rectangle: Rect): StackItem {
    return Builder(StackItem)
      .id(rectangle[ID])
      .label('Polygon_Rectangle_' + this.polygonRectangleIndex++)
      .itemType(ItemType.polygonRect)
      .data(rectangle)
      .children(null)
      .icon('material-icons rectangle')
      .build();
  }

  itemFromPolygonTriangle(triangle: Triangle): StackItem {
    return Builder(StackItem)
      .id(triangle[ID])
      .label('Polygon_Triangle_' + this.polygonTriangleIndex++)
      .itemType(ItemType.polygonTriangle)
      .data(triangle)
      .children(null)
      .icon('material-icons network_cell')
      .build();
  }

  itemFromTexture(texture: fabric.Image): StackItem {
    return Builder(StackItem)
      .id(texture[ID])
      .label('Texture_' + this.textureIndex++)
      .itemType(ItemType.texture)
      .data(texture)
      .children(null)
      .icon('material-icons image')
      .build();
  }

  createGroup(): void {
    // if (this.selectedItem && this.selectedItem.type !== ItemType.root) {
    //   this.wrapItemsInGroup();
    // } else {
    //
    // }
    this.itemList.unshift(this.newGroup());
    this.groupIndex++;
  }

  deleteItemByID(id: string): void {
    this.itemList.forEach(it => deleteElementById(it, id));
    this.itemList = this.itemList.filter(it => it.id !== id);
    this.selectedItem = null;
    this.selectedItemChanged.emit(this.selectedItem);
  }

  pushToListInCorrectPlace(item: StackItem): void {
    this.itemList.push(item);
    // if (!this.selectedItem || !this.selectedItem.parent) {
    //   //isRoot
    //   this.itemList.push(item);
    // } else {
    //   this.selectedItem.type === ItemType.group
    //     ? this.selectedItem.children.push(item)
    //     : this.selectedItem.parent.children.push(item);
    // }
  }

  // UNUSED YET
  updateItemParent(itemID: string, newParentID: string): void {
    const selectedItem = findByID(itemID, this.itemList);
    // selectedItem.parent = findByID(newParentID, this.itemList);
  }

  private newGroup(): StackItem {
    return Builder(StackItem)
      .label('Group_' + this.groupIndex)
      .itemType(ItemType.group)
      .data(undefined)
      .droppable(true)
      .icon('pi pi-folder-open')
      .styleClass('group-class')
      .leaf(false)
      .build();
  }

  private wrapItemsInGroup(): void {
    const group = this.newGroup();
    const children = [Object.assign({}, this.selectedItem)];
    this.selectedItem.label = group.label;
    this.selectedItem.id = group.id;
    this.selectedItem.data = group.data;
    this.selectedItem.itemType = group.itemType;
    this.selectedItem.children = children;
  }
}

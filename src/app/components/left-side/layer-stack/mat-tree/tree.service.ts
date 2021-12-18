import { Injectable } from '@angular/core';
import { ItemType, StackItem } from '../elements/StackItem';
import { Circle, Polyline, Rect, Triangle } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { StoreService } from '../../../../utils/store.service';
import { deleteElementById, findByID, flattenList } from '../../../../common/Utils';
import { ID } from '../../../../common/ProjectFileStructure';
import { Builder } from 'builder-pattern';

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
  private circleIndex = 1;
  private polygonRectangleIndex = 1;
  private polygonTriangleIndex = 1;
  private triangleIndex = 1;
  private textIndex = 1;

  constructor(public store: StoreService) {
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
    const item = new StackItem();
    item.id = line[ID];
    item.label = 'Line_' + this.lineIndex++;
    item.itemType = ItemType.line;
    item.data = line;
    item.children = null;
    return item;
  }

  itemFromRectangle(rectangle: Rect): StackItem {
    const item = new StackItem();
    item.id = rectangle[ID];
    item.label = 'Rectangle_' + this.rectangleIndex++;
    item.itemType = ItemType.rectangle;
    item.data = rectangle;
    item.children = null;
    return item;
  }

  itemFromText(text: fabric.Text): StackItem {
    const item = new StackItem();
    item.id = text[ID];
    item.label = 'TextElement_' + this.textIndex++;
    item.itemType = ItemType.text;
    item.data = text;
    item.children = null;
    return item;
  }

  itemFromTriangle(triangle: Triangle): StackItem {
    const item = new StackItem();
    item.id = triangle[ID];
    item.label = 'Triangle' + this.triangleIndex++;
    item.itemType = ItemType.triangle;
    item.data = triangle;
    item.children = null;
    return item;
  }

  itemFromCircle(circle: Circle): StackItem {
    const item = new StackItem();
    item.id = circle[ID];
    item.label = 'Circle_' + this.circleIndex++;
    item.itemType = ItemType.circle;
    item.data = circle;
    item.children = null;
    return item;
  }

  itemFromPolygonRectangle(rectangle: Rect): StackItem {
    const item = new StackItem();
    item.id = rectangle[ID];
    item.label = 'Polygon_Rectangle_' + this.polygonRectangleIndex++;
    item.itemType = ItemType.polygonRect;
    item.data = rectangle;
    item.children = null;
    return item;
  }

  itemFromPolygonTriangle(triangle: Triangle): StackItem {
    const item = new StackItem();
    item.id = triangle[ID];
    item.label = 'Polygon_Triangle_' + this.polygonTriangleIndex++;
    item.itemType = ItemType.polygonTriangle;
    item.data = triangle;
    item.children = null;
    return item;
  }

  itemFromTexture(texture: fabric.Image): StackItem {
    const item = new StackItem();
    item.id = texture[ID];
    item.label = 'Texture_' + this.textureIndex++;
    item.itemType = ItemType.texture;
    item.data = texture;
    item.children = null;
    return item;
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
    //selectedItem.parent = findByID(newParentID, this.itemList);
  }

  private newGroup(): StackItem {
    return Builder(StackItem)
      .label('Group_' + this.groupIndex)
      .itemType(ItemType.group)
      .data(undefined)
      .droppable(true)
      .icon('pi pi-folder')
      .expandedIcon('pi pi-folder-open')
      .collapsedIcon('pi pi-folder')
      .styleClass('group-class')
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

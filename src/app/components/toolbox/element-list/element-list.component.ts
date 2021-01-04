import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from 'fabric/fabric-impl';
import {StoreService} from '../../../utils/store.service';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';
import {generateId} from '../../layer-stack/elements/StackItem';
import {Color} from '@angular-material-components/color-picker';
import {LineDrawerComponent} from './line-drawer/line-drawer.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less']
})
export class ElementListComponent extends LineDrawerComponent implements OnInit {

  searchValue = '';
  elementTypes: string[];
  private allElementTypes: string[] = ['Rectangle', 'Line', 'Text', 'Texture'];

  constructor(public store: StoreService,
              public treeService: TreeService,
              public snackBar: MatSnackBar,
              private interactionService: InteractionService) {
    super(store, treeService, snackBar, interactionService);
  }

  ngOnInit(): void {
    this.elementTypes = [...this.allElementTypes];
  }

  filterOptions(): void {
    this.elementTypes = this.allElementTypes.filter(it => it.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  addRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true,
      strokeDashArray: [10,5],
    });
    rect['id'] = generateId();
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromRectangle(rect));
  }

  addTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 0, top: 0,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true
    });
    triangle['id'] = generateId();
    this.store.canvas.add(triangle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTriangle(triangle));
  }

  addPolygonRect(): void {
    const rect = new fabric.Rect({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    rect['id'] = generateId();
    this.store.canvas.add(rect);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromPolygonRectangle(rect));
  }

  addPolygonTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 50, height: 50,
      left: 100, top: 100,
      fill: new Color(0, 0, 0, 1) as any,
    });
    triangle['id'] = generateId();
    this.store.canvas.add(triangle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromPolygonTriangle(triangle));
  }


  addCircle(): void {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'rgba(0,0,0,0)',
      stroke: new Color(0, 0, 0, 1) as any,
      strokeWidth: 1,
      strokeUniform: true,
      left: 50, top: 50
    });
    circle['id'] = generateId();
    this.store.canvas.add(circle);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromCircle(circle));
  }

  addTexture(): void {
    const htmlImage = new Image();
    htmlImage.onload = img => {
      const image = new fabric.Image(htmlImage, {
        angle: 0,
        left: 100,
        top: 100,
        strokeUniform: true
      });
      image.scaleToWidth(100);
      image.scaleToHeight(100);
      image['id'] = generateId();
      this.store.canvas.add(image);
      this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTexture(image));
    };
    htmlImage.src = 'assets/image-placeholder.webp';
  }
}

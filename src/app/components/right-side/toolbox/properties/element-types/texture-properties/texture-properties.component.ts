import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import TgaLoader from 'tga-js';
import { BaseElementType } from '../BaseElementType';
import { BONENAME } from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-texture-properties',
  templateUrl: './texture-properties.component.html',
  styleUrls: ['./texture-properties.component.less']
})
export class TexturePropertiesComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  file = new FormControl('');

  defaultFile: FileInput;

  angle: number;
  newHeight = 0;
  newWidth = 0;

  constructor(store: StoreService) {
    super(store);
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.angle = this.getAngle();
    this.boneName = this.item.element[BONENAME];
    this.file.setValue(this.item.element['file']);
  }

  save(fileChange?): void {
    const image: fabric.Image = this.store.canvas.getActiveObject() as fabric.Image;
    image.left = Number(this.item.element.left);
    image.top = Number(this.item.element.top);
    image.scaleX = Number(this.newWidth / this.item.element.width);
    image.scaleY = Number(this.newHeight / this.item.element.height);
    image.angle = this.item.element.angle;
    image.setCoords();
    image.rotate(this.angle);
    if (fileChange) {
      this.changeTextureImage();
    }
    this.store.canvas.requestRenderAll();
  }

  changeTextureImage(): void {
    if (this.file.value) {
      this.item.element['file'] = this.file.value;
      const reader = new FileReader();
      reader.readAsDataURL(this.file.value.files[0]);
      reader.onload = event => this.swapImageInCanvas(event);
    }
  }

  updateHeight(event): void {
    this.newHeight = event.target.value;
    this.save();
  }

  updateWidth(event): void {
    this.newWidth = event.target.value;
    this.save();
  }

  getWidth(): number {
    return this.item.element.width * this.item.element.scaleX;
  }

  getHeight(): number {
    return this.item.element.height * this.item.element.scaleY;
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }

  private swapImageInCanvas(event: ProgressEvent<FileReader>): void {
    const fileURL = event.target.result.toString();
    const tga = new TgaLoader();
    tga.open(fileURL, () => {
      this.item.element.setSrc(tga.getDataURL('image/png'));
      this.store.canvas.requestRenderAll();
    });
  }
}

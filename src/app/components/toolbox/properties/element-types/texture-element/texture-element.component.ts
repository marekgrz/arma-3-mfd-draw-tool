import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FileInput} from 'ngx-material-file-input';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {fabric} from 'fabric';
import {StoreService} from '../../../../../utils/store.service';
import TgaLoader from 'tga-js';

@Component({
  selector: 'app-texture-element',
  templateUrl: './texture-element.component.html',
  styleUrls: ['./texture-element.component.less']
})
export class TextureElementComponent implements OnInit {

  @Input()
  item: StackItem;

  file = new FormControl('');

  defaultFile: FileInput;

  newHeight = 0;
  newWidth = 0;

  constructor(private store: StoreService) {
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
  }

  save(fileChange?): void {
    const image: fabric.Image = this.store.canvas.getActiveObject() as fabric.Image;
    image.left = Number(this.item.element.left);
    image.top = Number(this.item.element.top);
    image.scaleX = Number(this.newWidth / this.item.element.width);
    image.scaleY = Number(this.newHeight / this.item.element.height);
    image.angle = this.item.element.angle;
    image.setCoords();
    if (fileChange) {
      this.changeTextureImage();
    }
    this.store.canvas.requestRenderAll();
  }

  changeTextureImage(): void {
    if (this.file.value) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file.value.files[0]);
      reader.onload = event => this.swapImageInCanvas(event);
    }
  }

  private swapImageInCanvas(event: ProgressEvent<FileReader>): void {
    const fileURL = event.target.result.toString();
    const tga = new TgaLoader();
    tga.open(fileURL, () => {
      console.log('ImageLoaded');
      this.item.element.setSrc(tga.getDataURL('image/png'));
      this.store.canvas.requestRenderAll();
    });
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
}

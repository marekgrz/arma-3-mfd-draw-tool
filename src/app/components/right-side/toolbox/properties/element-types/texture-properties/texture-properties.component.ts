import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import TgaLoader from 'tga-js';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';
import { TextureFile } from './texture-file-selector/texture-file-selector.component';

@Component({
  selector: 'mfd-texture-properties',
  templateUrl: './texture-properties.component.html',
  styleUrls: ['./texture-properties.component.less']
})
export class TexturePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;

  loading = false;

  tga = new TgaLoader();

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
  }

  save(file?: TextureFile): void {
    const image: fabric.Image = this.store.canvas.getActiveObject() as fabric.Image;
    image.left = Number(this.item.data.left);
    image.top = Number(this.item.data.top);
    image.angle = this.item.data.angle;
    image.setCoords();
    image.rotate(this.angle);
    this.loadTextureFile(file);
    this.interactionService.refreshView();
  }

  loadTextureFile(textureFile: TextureFile): void {
    if (textureFile) {
      this.loading = true;
      this.item.textureFile = textureFile;
      this.swapImageInCanvas(textureFile.data);
    }
  }

  getAngle(): number {
    return this.item.data.angle * 1;
  }

  private swapImageInCanvas(data: string): void {
    this.tga.open(data, () => {
      this.loading = false;
      this.item.data.setSrc(this.tga.getDataURL('image/png'));
      this.store.canvas.requestRenderAll();
    });
  }
}

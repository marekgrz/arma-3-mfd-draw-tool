import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { fabric } from 'fabric';
import { StoreService } from '../../../../../../utils/store.service';
import TgaLoader from 'tga-js';
import { BaseElementProperties } from '../base-element-properties.directive';
import { BONENAME } from '../../../../../../common/ProjectFileStructure';
import { InteractionService } from '../../../../../left-side/layer-stack/mat-tree/interaction.service';

@Component({
  selector: 'mfd-texture-properties',
  templateUrl: './texture-properties.component.html',
  styleUrls: ['./texture-properties.component.less']
})
export class TexturePropertiesComponent extends BaseElementProperties implements OnInit {

  file = new FormControl('');
  defaultFile: FileInput;
  angle: number;

  constructor(public store: StoreService, public interactionService: InteractionService) {
    super(store, interactionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.file.setValue(this.item.element['file']);
  }

  save(fileChange?): void {
    const image: fabric.Image = this.store.canvas.getActiveObject() as fabric.Image;
    image.left = Number(this.item.element.left);
    image.top = Number(this.item.element.top);
    image.angle = this.item.element.angle;
    image.setCoords();
    image.rotate(this.angle);
    if (fileChange) {
      this.changeTextureImage();
    }
    this.interactionService.refreshView();
  }

  changeTextureImage(): void {
    if (this.file.value) {
      this.item.element['file'] = this.file.value;
      const reader = new FileReader();
      reader.readAsDataURL(this.file.value.files[0]);
      reader.onload = event => this.swapImageInCanvas(event);
    }
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

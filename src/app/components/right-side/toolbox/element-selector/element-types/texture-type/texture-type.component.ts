import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack/mat-tree/tree.service';
import { ID } from '../../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-texture-type',
  templateUrl: './texture-type.component.html',
  styleUrls: ['./texture-type.component.less']
})
export class TextureTypeComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
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
      image[ID] = generateId();
      this.store.canvas.add(image);
      this.treeService.pushToListInCorrectPlace(this.treeService.itemFromTexture(image));
    };
    htmlImage.src = 'assets/image-placeholder.webp';
  }
}

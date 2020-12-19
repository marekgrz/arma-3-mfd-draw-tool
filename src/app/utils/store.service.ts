import {Injectable} from '@angular/core';
import {Color} from '@angular-material-components/color-picker';
import {Canvas} from 'fabric/fabric-impl';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  canvas: Canvas;
  canvasWidth = 500;
  canvasHeight = 500;
  canvasBackgroundImg = '';
  canvasBackGroundColor = new Color(162, 162, 162);
  canvasUseImage = false;
  canvasBackgroundFile: File;
  canvasAspectRatio = 1;


  constructor() {
  }

  updateCanvas(): void {
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }
}

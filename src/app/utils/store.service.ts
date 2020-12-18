import {Injectable} from '@angular/core';
import {Color} from '@angular-material-components/color-picker';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  canvasWidth = 500;
  canvasHeight = 500;
  canvasBackgroundImg = '';
  canvasBackGroundColor = new Color(162, 162, 162);
  canvasUseImage = false;
  backGroundFile: File;
  aspectRatio = 1;

  constructor() {
  }
}

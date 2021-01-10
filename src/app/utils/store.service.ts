import {Injectable} from '@angular/core';
import {Color} from '@angular-material-components/color-picker';
import {Canvas} from 'fabric/fabric-impl';
import {GlobalHUDProperties, ProjectFileStructure} from '../common/ProjectFileStructure';

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

  // global properties
  hudProperties: GlobalHUDProperties = new GlobalHUDProperties();


  constructor() {
  }

  updateCanvas(): void {
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }

  reloadProject(project: ProjectFileStructure): void {
    this.canvasWidth = project.globalHUDProperties.screenWidth;
    this.canvasHeight = project.globalHUDProperties.screenHeight;
    this.updateCanvas();
    this.canvas.loadFromJSON(project.canvasContent, this.canvas.renderAll.bind(this.canvas));
  }

  resetProject(hudProperties: GlobalHUDProperties): void {
    this.hudProperties = hudProperties;
    this.canvas.clear();
    this.canvasWidth = this.hudProperties.screenWidth;
    this.canvasHeight = this.hudProperties.screenHeight;
    this.updateCanvas();
  }
}

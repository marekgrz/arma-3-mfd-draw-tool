import {Injectable} from '@angular/core';
import {Color} from '@angular-material-components/color-picker';
import {Canvas} from 'fabric/fabric-impl';
import {GlobalHUDProperties, ProjectFileStructure} from '../common/ProjectFileStructure';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  FONT_LIST: string[] = [
    'EtelkaMonospacePro',
    'EtelkaMonospaceProBold',
    'EtelkaNarrowMediumPro',
    'LucidaConsoleB',
    'PuristaBold',
    'PuristaLight',
    'PuristaMedium',
    'PuristaSemiBold',
    'RobotoCondensed',
    'RobotoCondensedBold',
    'RobotoCondensedLight',
    'TahomaB',
  ];

  canvas: Canvas;
  canvasWidth = 0;
  canvasHeight = 0;
  canvasBackgroundImg = '';
  canvasBackGroundColor = new Color(162, 162, 162);
  canvasUseImage = false;
  canvasBackgroundFile: File;
  canvasAspectRatio = 1;

  // global properties
  hudProperties: GlobalHUDProperties = new GlobalHUDProperties();
  isProjectStarted = false;

  constructor() {
  }

  updateCanvas(): void {
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }

  reloadProject(project: ProjectFileStructure): void {
    this.canvasWidth = project.globalHUDProperties.screenWidth;
    this.canvasHeight = project.globalHUDProperties.screenHeight;
    this.hudProperties = project.globalHUDProperties;
    this.updateCanvas();
    this.canvas.loadFromJSON(project.canvasContent, this.canvas.renderAll.bind(this.canvas));
    this.canvas.requestRenderAll();
    this.isProjectStarted = true;
  }

  startNewProject(hudProperties: GlobalHUDProperties): void {
    this.hudProperties = hudProperties;
    this.canvas.clear();
    this.canvasWidth = this.hudProperties.screenWidth;
    this.canvasHeight = this.hudProperties.screenHeight;
    this.updateCanvas();
    this.isProjectStarted = true;
  }

  resetCanvas(): void {
    if (this.canvas) {
      this.canvasWidth = 0;
      this.canvasHeight = 0;
      this.canvas.clear();
      this.updateCanvas();
      this.isProjectStarted = false;
    }
  }
}

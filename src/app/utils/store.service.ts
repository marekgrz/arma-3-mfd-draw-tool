import { EventEmitter, Injectable } from '@angular/core';
import { Color } from '@angular-material-components/color-picker';
import { Canvas } from 'fabric/fabric-impl';
import { GlobalHUDProperties, ProjectFileStructure } from '../common/ProjectFileStructure';
import { BoneBaseModel } from '../components/left-side/bones-list/BoneBaseModel';
import { Point } from '../common/Point';
import { Builder } from 'builder-pattern';
import { fabric } from 'fabric';

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

  LINE_TYPE_LIST: { name: string, value: number }[] = [
    {name: 'Full', value: 0},
    {name: 'Dotted', value: 1},
    {name: 'Dashed', value: 2},
    {name: 'Dot-dashed', value: 3},
  ];

  bones: BoneBaseModel[] = [];

  usedSources: string[] = [];

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

  itemContextMenuOpened: EventEmitter<{ e: MouseEvent, target: fabric.Object }> = new EventEmitter<{ e: MouseEvent, target: fabric.Object }>();

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
    this.canvas.getObjects().forEach(obj => {
      obj.on('mousedown', (event) => {
        if (event.button === 3) {
          this.openContextMenu(event);
        }
      });
      obj.strokeUniform = true;
    });
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

  updateProject(hudProperties: GlobalHUDProperties): void {
    this.hudProperties = hudProperties;
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

  openContextMenu(target): void {
    this.itemContextMenuOpened.emit(target);
  }

  getCanvasPositionFromDiscrete(point: Point): Point {
    return Builder(Point)
      .x(point.x * this.canvasWidth)
      .y(point.y * this.canvasHeight)
      .build();
  }

  addUsedSource(sourceName: string): void {
    if (this.usedSources.find(it => it === sourceName)) {
      return;
    }
    this.usedSources.push(sourceName);
  }
}

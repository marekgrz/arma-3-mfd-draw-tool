import { Component } from '@angular/core';
import { Point, Polyline } from 'fabric/fabric-impl';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack-ng/tree.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { fromEvent } from 'rxjs';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { ID, LINETYPE } from '../../../../../../common/ProjectFileStructure';
import { LineType } from '../../../../../../templates/Line';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-line-type',
  templateUrl: './line-type.component.html',
  styleUrls: ['./line-type.component.less']
})
export class LineTypeComponent {

  lineDrawingStarted = false;
  points: Point[];

  constructor(private store: StoreService,
              private treeService: TreeService,
              private snackBar: MatSnackBar,
              private interaction: InteractionService,
              private historyService: HistoryService) {
  }

  startLineDrawing(): void {
    this.interaction.startFreeDrawing();
    this.lineDrawingStarted = true;
    this.stopEvents();
    this.openSnackBarInfo();
    this.startKeyboardListener();
    this.points = [];
    this.startCanvasListener();
  }

  private startCanvasListener(): void {
    this.store.canvas.on('mouse:down', (options) => {
      this.points.push(options.pointer);
    });
    this.store.canvas.on('mouse:move', (options) => {
      if (this.points.length > 0) {
        const coords = [...this.points];
        coords.push(options.pointer);
        this.drawLineBetweenPoints(coords, true);
      }
    });
  }

  private startKeyboardListener(): void {
    const subscription = fromEvent(window, 'keydown').subscribe(ev => {
      if ((ev as KeyboardEvent).key === 'Enter') {
        this.stopEvents();
        this.finishLineDrawing();
        this.snackBar.dismiss();
        subscription.unsubscribe();
      }
      if ((ev as KeyboardEvent).key === 'Escape') {
        this.stopEvents();
        this.cancelDrawing();
        this.snackBar.dismiss();
        subscription.unsubscribe();
      }
    });
  }

  private drawLineBetweenPoints(coords: Point[], temporary: boolean): Polyline {
    this.store.canvas.getObjects()
      .filter(item => item[ID] === 'tempPolyLine')
      .map(element => this.store.canvas.remove(element));
    this.store.canvas.renderAll();
    const line = new fabric.Polyline(
      coords,
      {
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 5,
        strokeUniform: true,
        objectCaching: false,
        transparentCorners: false,
      });
    line[ID] = temporary ? 'tempPolyLine' : generateId();
    line[LINETYPE] = LineType.full;
    this.store.canvas.add(line);
    return line;
  }

  private finishLineDrawing(): void {
    this.interaction.stopFreeDrawing();
    this.lineDrawingStarted = false;
    if (this.points.length > 1) {
      this.treeService.pushToListInCorrectPlace(
        this.treeService.itemFromLine(this.drawLineBetweenPoints(this.points, false))
      );
      this.historyService.addSnapshot();
    } else {
      this.cancelDrawing();
    }
    this.points = [];
  }

  private cancelDrawing(): void {
    this.interaction.stopFreeDrawing();
    this.lineDrawingStarted = false;
    this.store.canvas.getObjects()
      .filter(item => item[ID] === 'tempPolyLine')
      .map(element => this.store.canvas.remove(element));
    this.points = [];
    this.store.canvas.renderAll();
  }

  private stopEvents(): void {
    this.store.canvas.off('mouse:down');
    this.store.canvas.off('mouse:move');
  }

  private openSnackBarInfo(): void {
    this.snackBar.open('Click enter to finish drawing line');
  }
}

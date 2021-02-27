import {Component} from '@angular/core';
import {Point, Polyline} from 'fabric/fabric-impl';
import {StoreService} from '../../../../../utils/store.service';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../../../layer-stack/mat-tree/interaction.service';
import {fromEvent} from 'rxjs';
import {fabric} from 'fabric';
import {Color} from '@angular-material-components/color-picker';
import {generateId} from '../../../../layer-stack/elements/StackItem';
import {ID} from '../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.less']
})
export class LineComponent {

  lineDrawingStarted = false;
  points: Point[];

  constructor(private store: StoreService,
              private treeService: TreeService,
              private snackBar: MatSnackBar,
              private interaction: InteractionService) {
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
        fill: 'rgba(0,0,0,0)',
        stroke: new Color(0, 0, 0, 1) as any,
        strokeWidth: 5,
        strokeUniform: true,
        objectCaching: false,
        transparentCorners: false,
      });
    line[ID] = temporary ? 'tempPolyLine' : generateId();
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

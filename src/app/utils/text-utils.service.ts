import { Injectable } from '@angular/core';
import { Point } from '../common/Point';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class TextUtilsService {

  constructor(private store: StoreService) { }

  invertTextAlign(align: string): string {
    switch (align) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      case 'center':
        return 'center';
    }
  }

  getTextPosition(element): TextPoint {
    const fontWidthCanvas = element.calcTextWidth() / element.text.length;
    const fontHeightCanvas = element.fontSize;
    console.log('Width: ' + fontWidthCanvas);
    console.log('Height: ' + fontHeightCanvas);

    const fontWidth = fontWidthCanvas * 2.4;
    const fontHeight = fontHeightCanvas * 1.2;

    let offsetX = 0;
    const offsetY = this.store.fromCanvasY(element.calcTextHeight() / 5);
    let result: TextPoint;

    switch (element.textAlign) {
      case 'right':
        offsetX = this.store.fromCanvasX(element.calcTextWidth() / element.text.length * 1.5);
        result = TextPoint.from(
          Point.from(this.store.fromCanvasX((element.aCoords.tr.x - fontWidth)),  this.store.fromCanvasY(element.aCoords.tr.y)),
          Point.from(this.store.fromCanvasX((element.aCoords.tr.x )),             this.store.fromCanvasY(element.aCoords.tr.y)),
          Point.from(this.store.fromCanvasX((element.aCoords.tr.x - fontWidth)), this.store.fromCanvasY(element.aCoords.tr.y + fontHeight))
        );
        return this.offsetPoints(result, offsetX, offsetY);
      case 'center':
        offsetX = this.store.fromCanvasX(element.calcTextWidth() / element.text.length) * - 0.5;
        const center = (element.aCoords.tl.x + (element.aCoords.tr.x - element.aCoords.tl.x) / 2) - (this.store.fromCanvasX(fontWidth) / 2);
        result = TextPoint.from(
          Point.from(this.store.fromCanvasX(center),              this.store.fromCanvasY(element.aCoords.tl.y)),
          Point.from(this.store.fromCanvasX(center + fontWidth), this.store.fromCanvasY(element.aCoords.tl.y)),
          Point.from(this.store.fromCanvasX(center),            this.store.fromCanvasY(element.aCoords.tl.y + fontHeight))
        );
        return this.offsetPoints(result, offsetX, offsetY);
      case 'left':
        result = TextPoint.from(
          Point.from(this.store.fromCanvasX((element.aCoords.tl.x)),              this.store.fromCanvasY(element.aCoords.tl.y)),
          Point.from(this.store.fromCanvasX((element.aCoords.tl.x + fontWidth)), this.store.fromCanvasY(element.aCoords.tl.y)),
          Point.from(this.store.fromCanvasX((element.aCoords.tl.x)),            this.store.fromCanvasY(element.aCoords.tl.y + fontHeight))
        );
        return this.offsetPoints(result, offsetX, offsetY);
    }
  }

  private offsetPoints(input: TextPoint, offsetX: number, offsetY: number): TextPoint {
    return {
      pos: Point.from(input.pos.x + offsetX, input.pos.y - offsetY),
      right: Point.from(input.right.x + offsetX, input.right.y - offsetY),
      down: Point.from(input.down.x + offsetX, input.down.y - offsetY)
    };
  }
}

export class TextPoint {
  pos: Point;
  right: Point;
  down: Point;

  constructor(pos: Point, right: Point, down: Point) {
    this.pos = pos;
    this.right = right;
    this.down = down;
  }

  static from(pos: Point, right: Point, down: Point): TextPoint {
    return new TextPoint(pos, right, down);
  }
}
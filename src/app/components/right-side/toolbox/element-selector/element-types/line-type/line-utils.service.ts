import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class LineUtilsService {

  constructor() { }

  public recalculatePolyLinePointsPosition(polyLine: fabric.Polyline): void {
    const newDimensions = polyLine._calcDimensions();
    const currentLeft = polyLine.left;
    const currentTop = polyLine.top;
    polyLine.points.forEach(point => {
      point.x = point.x + (currentLeft - newDimensions.left);
      point.y = point.y + (currentTop - newDimensions.top);
    });
    this.recalculatePolyLineDimensions(polyLine);
  }

  public recalculatePolyLineDimensions(polyLine: fabric.Polyline): void {
    const newDimensions = polyLine._calcDimensions();
    polyLine.set({
      top: newDimensions.top,
      left: newDimensions.left,
      width: newDimensions.width,
      height: newDimensions.height,
      // @ts-ignore
      pathOffset: {
        x: newDimensions.left + newDimensions.width / 2,
        y: newDimensions.top + newDimensions.height / 2
      }
    });
    polyLine.setCoords();
  }

  public recalculateRotation(polyLine: fabric.Polyline): void {
    const matrix = polyLine.calcTransformMatrix();
    const transformedPoints = polyLine.points.map(p => {
      return new fabric.Point(
        p.x - polyLine.pathOffset.x,
        p.y - polyLine.pathOffset.y);
    }).map(p => {
      return fabric.util.transformPoint(p, matrix, false);
    });
    polyLine.points = transformedPoints;
    polyLine.setCoords();
    this.recalculatePolyLineDimensions(polyLine);
    polyLine.rotate(0);
  }
}

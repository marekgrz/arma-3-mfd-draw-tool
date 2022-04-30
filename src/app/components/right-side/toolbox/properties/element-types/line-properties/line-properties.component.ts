import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { fabric } from 'fabric';
import { Point } from 'fabric/fabric-impl';
import { LineType } from '../../../../../../templates/Line';
import { CURRENT_ANGLE, LINE_TYPE, PREVIOUS_ANGLE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementProperties } from '../base-element-properties.directive';
import { InteractionService } from '../../../../../left-side/layer-stack-ng/interaction.service';
import { ElementTransformService } from '../element-transform.service';
import { LineUtilsService } from '../../../element-selector/element-types/line-type/line-utils.service';

@Component({
  selector: 'mfd-line-properties',
  templateUrl: './line-properties.component.html',
  styleUrls: ['./line-properties.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LinePropertiesComponent extends BaseElementProperties implements OnInit {

  angle: number;
  lineType = LineType.full;

  constructor(public store: StoreService,
              interactionService: InteractionService,
              elementTransformService: ElementTransformService,
              private lineUtils: LineUtilsService) {
    super(store, interactionService, elementTransformService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.angle = this.getAngle();
    this.lineType = this.item.data[LINE_TYPE];
    this.color = this.store.canvas.getActiveObject().stroke;
    this.setupPolyLineEdit();
  }

  polygonPositionHandler(dim, finalMatrix, fabricObject): Point {
    // @ts-ignore
    const x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x);
    // @ts-ignore
    const y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
      {x, y} as Point,
      fabric.util.multiplyTransformMatrices(
        fabricObject.canvas.viewportTransform,
        fabricObject.calcTransformMatrix()
      )
    );
  }

  actionHandler(eventData, transform, x, y): boolean {
    const polygon = transform.target;
    const currentControl = polygon.controls[polygon.__corner];
    const mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center');
    const polygonBaseSize = polygon._getNonTransformedDimensions();
    const size = polygon._getTransformedDimensions(0, 0);
    polygon.points[currentControl.pointIndex] = {
      x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
      y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
    };
    return true;
  }

  anchorWrapper(anchorIndex, fn): (eventData, transform, x, y) => any {
    return (eventData, transform, x, y) => {
      const fabricObject = transform.target;
      const absolutePoint = fabric.util.transformPoint({
        x: 0,
        y: 0,
      } as Point, fabricObject.calcTransformMatrix());
      const actionPerformed = fn(eventData, transform, x, y);
      const newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / fabricObject.width;
      const newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / fabricObject.height;
      fabricObject.setPositionByOrigin(absolutePoint, (newX + 0.5).toString(), (newY + 0.5).toString());
      return actionPerformed;
    };
  }

  save(): void {
    const line: fabric.Polyline = this.store.canvas.getActiveObject() as fabric.Polyline;
    line[LINE_TYPE] = this.lineType;
    this.setElementStroke(line);
    this.refresh();
  }

  onPointPositionModified(): void {
    const line: fabric.Polyline = this.store.canvas.getActiveObject() as fabric.Polyline;
    this.lineUtils.recalculatePolyLineDimensions(line);
    this.refresh();
  }

  /* .rotate() nie obraca o zadana wartosc a ustawia kąt calego obiektu. Czyli .rotate(0) ustawi element zeby mial kąt 0 stopni*/
  onAngleModified(): void {
    const line: fabric.Polyline = this.store.canvas.getActiveObject() as fabric.Polyline;
    this.item.data[CURRENT_ANGLE] = this.angle;
    if (!this.item.data[PREVIOUS_ANGLE]) {
      this.item.data[PREVIOUS_ANGLE] = 0;
    }
    const angleDiff = this.item.data[CURRENT_ANGLE] - this.item.data[PREVIOUS_ANGLE];
    this.item.data[PREVIOUS_ANGLE] = this.item.data[CURRENT_ANGLE];
    line.rotate(angleDiff);
    line.setCoords();
    this.lineUtils.recalculateRotation(line);
    this.refresh();
  }

  // Custom angle for line due to ability to modify points
  getAngle(): number {
    return this.item.data[CURRENT_ANGLE] || 0 * 1;
  }

  private setupPolyLineEdit(): void {
    const poly: any = this.store.canvas.getActiveObject();
    poly.objectCaching = false;
    const lastControl = poly.points.length - 1;
    poly.cornerStyle = 'circle';
    poly.cornerColor = 'rgba(0,0,255,0.5)';
    poly.controls = poly.points.reduce((acc, point, index) => {
      // @ts-ignore
      acc['p' + index] = new fabric.Control({
        positionHandler: this.polygonPositionHandler,
        actionHandler: this.anchorWrapper(index > 0 ? index - 1 : lastControl, this.actionHandler),
        actionName: 'modifyPolygon',
        // @ts-ignore
        pointIndex: index
      });
      return acc;
    }, {});
    poly.hasBorders = false;
  }
}

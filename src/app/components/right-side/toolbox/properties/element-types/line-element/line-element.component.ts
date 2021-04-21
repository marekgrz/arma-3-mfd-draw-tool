import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../../left-side/layer-stack/elements/StackItem';
import {FormControl} from '@angular/forms';
import {StoreService} from '../../../../../../utils/store.service';
import {fabric} from 'fabric';
import {Point} from 'fabric/fabric-impl';
import {LineType} from '../../../../../../templates/Line';
import {LINETYPE} from '../../../../../../common/ProjectFileStructure';
import {BaseElementType} from '../BaseElementType';

@Component({
  selector: 'app-line-element',
  templateUrl: './line-element.component.html',
  styleUrls: ['./line-element.component.less']
})
export class LineElementComponent extends BaseElementType implements OnInit {

  @Input()
  item: StackItem;

  newHeight = 0;
  newWidth = 0;
  angle: number;
  lineType = LineType.full;
  color: FormControl;

  constructor(public store: StoreService) {
    super(store);
  }

  ngOnInit(): void {
    this.newHeight = this.getHeight();
    this.newWidth = this.getWidth();
    this.angle = this.getAngle();
    this.color = new FormControl(this.store.canvas.getActiveObject().stroke);
    this.lineType = this.item.element[LINETYPE];

    this.setupPolyLineEdit();
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
        pointIndex: index
      });
      return acc;
    }, {});
    poly.hasBorders = false;
    this.store.canvas.requestRenderAll();
  }

  polygonPositionHandler(dim, finalMatrix, fabricObject): Point {
    // @ts-ignore
    const x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x);
    // @ts-ignore
    const y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
      { x, y } as Point,
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
      const  absolutePoint = fabric.util.transformPoint({
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
    const line: fabric.Object = this.store.canvas.getActiveObject();
    line.left = Number(this.item.element.left);
    line.top = Number(this.item.element.top);
    line.scaleX = Number(this.newWidth / this.item.element.width);
    line.scaleY = Number(this.newHeight / this.item.element.height);
    line[LINETYPE] = this.lineType;
    line.set('stroke', this.color.value);
    line.set('strokeWidth', Number(this.item.element.strokeWidth));
    line.setCoords();
    line.rotate(this.angle);
    this.store.canvas.requestRenderAll();
  }

  updateHeight(event): void {
    this.newHeight = event.target.value;
    this.save();
  }

  updateWidth(event): void {
    this.newWidth = event.target.value;
    this.save();
  }

  getWidth(): number {
    return this.item.element.width * this.item.element.scaleX;
  }

  getHeight(): number {
    return this.item.element.height * this.item.element.scaleY;
  }

  getAngle(): number {
    return this.item.element.angle * 1;
  }
}

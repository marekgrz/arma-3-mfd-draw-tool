import { Point } from '../common/Point';
import { BaseElementModel } from '../common/BaseElementModel';
import { Color } from '../common/Color';

export class Line extends BaseElementModel {
  name: string;
  color: Color;
  lineType = 0;
  width = 1;
  bone?: string;
  points: Point[] = [];
}

export enum LineType {
  full = 0,
  dotted = 1,
  dashed = 2,
  dotDashed = 3
}

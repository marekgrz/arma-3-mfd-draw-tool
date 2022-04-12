import { BaseElementModel } from '../common/BaseElementModel';
import { Point } from '../common/Point';
import { Color } from '../common/Color';

export class Polygon extends BaseElementModel {
  name: string;
  color: Color;
  texturePath = '';
  bone?: string;
  points: Point[] = [];
}

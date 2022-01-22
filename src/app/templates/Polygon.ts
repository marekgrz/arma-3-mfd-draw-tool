import { BaseElementModel } from '../common/BaseElementModel';
import { Color } from '@angular-material-components/color-picker';
import { Point } from '../common/Point';

export class Polygon extends BaseElementModel {
  name: string;
  color: Color;
  texturePath = '';
  bone?: string;
  points: Point[] = [];
}

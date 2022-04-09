import { BaseElementModel } from '../common/BaseElementModel';
import { Color } from '@angular-material-components/color-picker';
import { Point } from '../common/Point';

export class TextElement extends BaseElementModel {
  name: string;
  color: Color;
  source = '';
  text?: string;
  bone?: string;
  align: string = TextElementAlign.center;
  scale = 1;
  pos: Point;
  right: Point;
  down: Point;
}

export enum TextElementAlign {
  center = 'center',
  right = 'right',
  left = 'left'
}

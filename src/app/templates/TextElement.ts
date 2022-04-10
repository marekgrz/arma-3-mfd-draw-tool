import { BaseElementModel } from '../common/BaseElementModel';
import { Point } from '../common/Point';
import { Color } from '../common/Color';

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

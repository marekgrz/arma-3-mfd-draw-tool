import { BaseElementModel } from '../common/BaseElementModel';
import { Point } from '../common/Point';
import { Color } from '../common/Color';

export class ClassGroup extends BaseElementModel {
  name: string;
  content: BaseElementModel[] = [];
  contentText: string;
  color?: Color;
  alpha?: number;
  clipTL?: Point;
  clipBR?: Point;
  clipTLParallax?: Point;
  clipBRParallax?: Point;
  condition?: string;
  blinking?: boolean;
  blinkingPattern?: string;
  blinkingStartsOn?: boolean;
}

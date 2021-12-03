import {BaseElementModel} from '../common/BaseElementModel';
import {getColorArray} from '../common/Utils';
import {Color} from '@angular-material-components/color-picker';
import {Point} from '../common/Point';

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
  blinkingStartsOn?: number;
}

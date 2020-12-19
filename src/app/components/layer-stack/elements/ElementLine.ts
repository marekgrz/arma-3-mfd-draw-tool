import {BaseElement} from './BaseElement';
import {Line} from 'fabric/fabric-impl';

export class ElementLine implements BaseElement{
  name: string;
  content: Line;
}

/*
* https://stackoverflow.com/questions/60510754/convert-circle-to-polyline
 */

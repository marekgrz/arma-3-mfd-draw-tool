import {LineType} from '../../../../templates/Line';

export class BaseElementType {

  setElementLineType(element, lineType: LineType): void {
    switch (lineType) {
      case LineType.full: {
        element.set('strokeDashArray', undefined);
        break;
      }
      case LineType.dotted: {
        element.set('strokeDashArray', [element['strokeWidth'], element['strokeWidth']]);
        break;
      }
      case LineType.dashed: {
        element.set('strokeDashArray', [Number.parseFloat(element['strokeWidth']) * 2, Number.parseFloat(element['strokeWidth']) * 2]);
        break;
      }
      case LineType.dotDashed: {
        element.set('strokeDashArray', [Number.parseFloat(element['strokeWidth']) * 2, Number.parseFloat(element['strokeWidth']) * 2]);
        break;
      }
      default: {
        element.set('strokeDashArray', undefined);
        break;
      }
    }
  }
}

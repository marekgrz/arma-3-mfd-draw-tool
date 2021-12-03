export class BaseElementModel {
  type: ElementType;
}

export enum ElementType {
  group = 'GROUP',
  line = 'LINE',
  circle = 'CIRCLE',
  rectangle = 'RECTANGLE',
  triangle = 'TRIANGLE',
  polygon = 'POLYGON'
}

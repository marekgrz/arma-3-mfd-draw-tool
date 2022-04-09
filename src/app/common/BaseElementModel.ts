export class BaseElementModel {
  type: ElementType;
}

export enum ElementType {
  group = 'GROUP',
  line = 'LINE',
  circle = 'CIRCLE',
  triangle = 'TRIANGLE',
  polygon = 'POLYGON',
  text = 'TEXT'
}

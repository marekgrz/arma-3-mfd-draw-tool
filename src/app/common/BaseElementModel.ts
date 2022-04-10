export class BaseElementModel {
  type: ElementType;
}

export enum ElementType {
  group = 'GROUP',
  mfdParent = 'MFDPARENT',
  line = 'LINE',
  circle = 'CIRCLE',
  triangle = 'TRIANGLE',
  polygon = 'POLYGON',
  text = 'TEXT'
}

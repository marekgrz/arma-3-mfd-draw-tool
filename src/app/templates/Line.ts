import {getBoneIfExists, getColorArray} from '../common/Utils';
import {Point} from '../common/Point';
import {BaseShape} from '../common/BaseShape';
import {Color} from '@angular-material-components/color-picker';

export class Line implements BaseShape {
  name: string;
  color: Color;
  lineType = 0;
  width = 1;
  bone?: string;
  points: Point[] = [];

  getElement(indent: string): string {
    return `
${indent}class ${this.name}
${indent}{
${indent}\t${getColorArray(this.color)}
${indent}\tclass Line
${indent}\t{
${indent}\t\ttype\t\t= "line";
${indent}\t\tlineType\t= ${this.lineType};
${indent}\t\twidth\t\t= ${this.width};
${indent}\t\tpoints[]\t=
${indent}\t\t{${getLinePoints(this.points, indent, this.bone)}
${indent}\t\t};
${indent}\t};
${indent}};`;
  }
}

function getLinePoints(points: Point[], indent: string, bone?: string): string {
  let result = '';
  let counter = 0;
  indent += '\t\t\t';
  points.map(point => {
    counter++;
    const comma = counter <= points.length - 1 ? ', ' : '';
    result += `\n${indent}{ ${getBoneIfExists(bone)} { ${point.x}, ${point.y}, 1 }}${comma}`;
  });
  return result;
}

export enum LineType {
  full = 0,
  dotted = 1,
  dashed = 2,
  dotDashed = 3
}

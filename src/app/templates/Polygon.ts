import {PolygonPoints} from '../common/PolygonPoints';
import {getBoneIfExists, getColorArray} from '../common/Utils';
import {BaseShape} from '../common/BaseShape';
import { Color } from '@angular-material-components/color-picker';
import { Point } from '../common/Point';

export class Polygon implements BaseShape{
  name: string;
  color: Color;
  texturePath = '';
  bone?: string;
  points: Point[] = [];

  getElement(indent: string): string {
    return `
${indent}class ${this.name}
${indent}{
${indent}\t${getColorArray(this.color)}
${indent}\tclass Polygon
${indent}\t{
${indent}\t\ttype\t= "polygon";
${indent}\t\ttexture\t= "${this.texturePath}";
${indent}\t\tpoints[]=
${indent}\t\t{
${indent}\t\t\t{
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points[0]} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points[1]} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points[2]} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points[3]} }, 1 }
${indent}\t\t\t}
${indent}\t\t};
${indent}\t};
${indent}};`;
  }
}

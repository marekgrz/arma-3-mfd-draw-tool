import {Color} from '../common/Color';
import {PolygonPoints} from '../common/PolygonPoints';
import {getBoneIfExists, getColorArray} from '../common/Utils';
import {BaseShape} from '../common/BaseShape';

export class Polygon implements BaseShape{
  name: string;
  color: Color;
  texturePath = '';
  bone?: string;
  points: PolygonPoints = new PolygonPoints();

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
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points.getTL()} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points.getTR()} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points.getBR()} }, 1 },
${indent}\t\t\t{${getBoneIfExists(this.bone)} { ${this.points.getBL()} }, 1 }
${indent}\t\t\t}
${indent}\t\t};
${indent}\t};
${indent}};`;
  }
}

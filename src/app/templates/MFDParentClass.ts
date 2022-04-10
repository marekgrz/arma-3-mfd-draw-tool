import { ClassGroup } from './ClassGroup';
import { Color } from '../common/Color';

export class MFDParentClass extends ClassGroup {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  borderTop: number;
  borderBottom: number;
  borderLeft: number;
  borderRight: number;
  font?: string;
  material?: MaterialColor;
}

export class MaterialColor {
  diffuse: Color;
  ambient: Color;
  emissive: Color;

  static from(diffuse: Color, ambient: Color, emissive: Color): MaterialColor {
    const material = new MaterialColor();
    material.diffuse = diffuse;
    material.ambient = ambient;
    material.emissive = emissive;
    return material;
  }
}
import {Color} from './Color';

export function getBoneIfExists(bone: string): string {
  return bone && bone.length > 0 ? bone + ', ' : '';
}

export function getCondition(condition: string): string {
  if (!condition) {
    return '';
  }
  return `condition = "${condition}";`;
}


export function getColorArray(color: Color): string {
  if (!color) {
    return '';
  }
  return `color[] = { ${color.r}, ${color.g}, ${color.b}, ${color.a} };`;
}

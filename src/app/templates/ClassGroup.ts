import {BaseShape} from '../common/BaseShape';
import {getColorArray} from '../common/Utils';
import {Color} from '@angular-material-components/color-picker';
import {Point} from '../common/Point';

export class ClassGroup implements BaseShape {
  name: string;
  content: any = [];
  color?: Color;
  alpha?: number;
  clipTL?: Point;
  clipBR?: Point;
  clipTLParallax?: Point;
  clipBRParallax?: Point;
  condition?: string;
  blinking?: boolean;
  blinkingPattern?: string;
  blinkingStartsOn?: number;

  getElement(indent: string = ''): string {
    const content = `
${indent}class ${this.name}
${indent}{
${indent}\t${getColorArray(this.color)}
${indent}\t${getCondition(this.condition)}
${indent}\t${getBlinkingPattern(this)}
${indent}\t${getBlinkingStartsOn(this)}
${indent}\t${getClipArray('clipTL', this.clipTL)}
${indent}\t${getClipArray('clipBR', this.clipBR)}
${indent}\t${getClipArray('clipTLParallax', this.clipTLParallax)}
${indent}\t${getClipArray('clipBRParallax', this.clipBRParallax)}
${indent}\t${getContent(this.content, indent)}
${indent}};${addCommentsOnEndOfClass(this.name)}`.split('\n').filter(line => line.trim().length).join('\n');
    return '\n' + content;
  }
}


function getCondition(condition: string): string {
  if (!condition) {
    return '';
  }
  return `condition = "${condition}";`;
}

function getBlinkingPattern(classGroup: ClassGroup): string {
  if (!classGroup.blinking) {
    return '';
  }
  return `blinkingPattern[] = { ${classGroup.blinkingPattern} };`;
}

function getBlinkingStartsOn(classGroup: ClassGroup): string {
  if (!classGroup.blinking) {
    return '';
  }
  return `blinkingStartsOn = ${classGroup.blinkingStartsOn};`;
}

function getClipArray(attribute: string, value: Point): string {
  if (!value) {
    return '';
  }
  if (value.x === 0 || value.y === 0) {
    return '';
  }
  return `${attribute} = [ ${value.x}, ${value.y} ];`;
}

function getContent(content: BaseShape[], indent: string): string {
  let result = ``;
  indent += '\t';
  content.forEach(shape => {
    result += shape.getElement(indent);
  });
  return result;
}

function addCommentsOnEndOfClass(name: string, bool: boolean = true): string {
  return bool ? ` //End of ${name}` : ``;
}

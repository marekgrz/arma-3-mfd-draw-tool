import {BaseShape} from '../common/BaseShape';
import {getColorArray, getCondition} from '../common/Utils';
import {Color} from '@angular-material-components/color-picker';

export class ClassGroup implements BaseShape {
  name: string;
  content: BaseShape[] = [];
  color?: Color;
  condition?: string;

  getElement(indent: string = ''): string {
    const content = `
${indent}class ${this.name}
${indent}{
${indent}\t${getColorArray(this.color)}
${indent}\t${getCondition(this.condition)}
${indent}\t${getContent(this.content, indent)}
${indent}};${addCommentsOnEndOfClass(this.name)}`.split('\n').filter(line => line.trim().length).join('\n');
    return '\n' + content;
  }
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

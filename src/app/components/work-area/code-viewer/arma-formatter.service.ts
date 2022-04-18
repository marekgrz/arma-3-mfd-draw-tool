import { Injectable } from '@angular/core';
import { BaseElementModel, ElementType } from '../../../common/BaseElementModel';
import { MFDParentClass } from '../../../templates/MFDParentClass';
import Mustache from 'mustache';
import { ClassGroup } from '../../../templates/ClassGroup';
import { Line } from '../../../templates/Line';
import { Polygon } from '../../../templates/Polygon';
import { TextElement } from '../../../templates/TextElement';
import { ElementParserService } from '../../../utils/element-parser.service';
import { Observable, of } from 'rxjs';
import { Builder } from 'builder-pattern';
import { IpcService } from '../../../utils/ipc.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArmaFormatterService {

  templates: MustacheTemplates;

  constructor(private elementParser: ElementParserService,
              private ipc: IpcService) {
  }

  getFormattedText(): Observable<string> {
    if (this.templates) {
      return of(this.renderObjectToString(this.elementParser.getMFDClass()));
    }
    return this.loadTemplates()
      .pipe(
        map(value => {
          this.templates = value;
          return this.renderObjectToString(this.elementParser.getMFDClass());
        }));
  }

  private loadTemplates(): Observable<MustacheTemplates> {
    if (this.templates) {
      return new Observable<MustacheTemplates>(observer => {
        observer.next(this.templates);
        observer.complete();
      });
    }
    this.ipc.send('loadTemplates', '');
    return new Observable<MustacheTemplates>(observer => {
      this.ipc.on('loadTemplates', (event: Electron.IpcMessageEvent, message: TemplateData[]) => {
        observer.next(this.getMustacheTemplates(message));
        observer.complete();
      });
    });
  }

  private getMustacheTemplates(message: TemplateData[]): MustacheTemplates {
    const templates = Builder(MustacheTemplates)
      .mfdParent(message.find(it => it.name === 'mfd_parent')?.template)
      .group(message.find(it => it.name === 'group')?.template)
      .line(message.find(it => it.name === 'line')?.template)
      .polygon(message.find(it => it.name === 'polygon')?.template)
      .text(message.find(it => it.name === 'text')?.template)
      .build();
    this.templates = templates;
    return templates;
  }

  private renderObjectToString(content: BaseElementModel): string {
    switch (content.type) {
      case ElementType.mfdParent: {
        const input = content as MFDParentClass;
        if (input.content) {
          input.contentText = this.addIndentForEachLine(this.getInnerContent(input));
        }
        return Mustache.render(this.templates.mfdParent, input);
      }
      case ElementType.group: {
        const input = content as ClassGroup;
        if (input.content) {
          input.contentText = this.addIndentForEachLine(this.getInnerContent(input));
        }
        return Mustache.render(this.templates.group, input);
      }
      case ElementType.line: {
        const line = content as Line;
        line.points.map((point, index) => point['comma'] = index < line.points.length - 1);
        return Mustache.render(this.templates.line, line);
      }
      case ElementType.polygon: {
        const polygon = content as Polygon;
        polygon.points.map((point, index) => point['comma'] = index < polygon.points.length - 1);
        return Mustache.render(this.templates.polygon, polygon);
      }
      case ElementType.text: {
        const textElement = content as TextElement;
        return Mustache.render(this.templates.text, textElement);
      }
    }
  }

  private getInnerContent(input: ClassGroup): string {
    // concat all group items, separated by \n
    let element = '';
    input.content.map((item, index) => element += this.renderObjectToString(item).concat(index !== input.content.length - 1 ? '\n' : ''));
    return element;
  }

  private addIndentForEachLine(content: string): string {
    if (content.length < 1) {
      return content;
    }
    const regexSearch = content.includes('\n\t') ? /\n /g : /\n/g;
    const indent = content.includes('\n\t') ? '\n   ' : '\n  ';
    return content.replace(regexSearch, indent);
  }
}

export interface TemplateData {
  name: string;
  template: string;
}

export class MustacheTemplates {
  mfdParent: string;
  group: string;
  line: string;
  polygon: string;
  text: string;
}

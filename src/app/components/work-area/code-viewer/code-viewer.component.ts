import { Component, OnDestroy } from '@angular/core';
import { TreeService } from '../../left-side/layer-stack-ng/tree.service';
import { ClassGroup } from '../../../templates/ClassGroup';
import { ElementParserService } from '../../../utils/element-parser.service';
import Mustache from 'mustache';
import { MustacheTemplates, MustacheTemplatesService } from './mustache-templates.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BaseElementModel, ElementType } from '../../../common/BaseElementModel';
import { Line } from '../../../templates/Line';
import { Polygon } from '../../../templates/Polygon';
import { TextElement } from '../../../templates/TextElement';

@Component({
  selector: 'mfd-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnDestroy {

  templates: MustacheTemplates;

  private subscription: Subscription = null;

  structuredText = '';

  constructor(private elementParser: ElementParserService,
              private treeService: TreeService,
              private templatesService: MustacheTemplatesService,
              private toastrService: ToastrService) {
    this.subscription = this.templatesService.loadTemplates().subscribe(value => {
        this.templates = value;
        this.loadText();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCopy(): void {
    this.toastrService.info('Copied to clipboard', '', {timeOut: 1000});
  }

  loadText(): void {
    this.structuredText = this.renderObjectToString(this.elementParser.getMFDClass());
    console.log(this.elementParser.getMFDClass());
  }

  private renderObjectToString(content: BaseElementModel): string {
    switch (content.type) {
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
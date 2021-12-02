import { Component, OnDestroy } from '@angular/core';
import { TreeService } from '../../left-side/layer-stack/mat-tree/tree.service';
import { ClassGroup } from '../../../templates/ClassGroup';
import { Line, LineType } from '../../../templates/Line';
import { Color } from '@angular-material-components/color-picker';
import { ElementParserService } from '../../../utils/element-parser.service';
import * as Mustache from 'mustache';
import { MustacheTemplates, MustacheTemplatesService } from './mustache-templates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mfd-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnDestroy {

  templates: MustacheTemplates;

  private subscription: Subscription = null;

  constructor(private elementParser: ElementParserService,
              private treeService: TreeService,
              private templatesService: MustacheTemplatesService) {
    this.subscription = this.templatesService.loadTemplates().subscribe(value => {
        this.templates = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadText(): string {
    //console.log(this.elementParser.getMFDClass())
    const line = new Line();
    line.color = {r: 0.5, g: 0.5, b: 0.5, a: 0.5} as Color;
    line.name = 'Line_1';
    line.lineType = LineType.dashed;
    line.width = 2;

    const groupInnerInner = new ClassGroup();
    groupInnerInner.color = {r: 0.1, g: 0.2, b: 0.3, a: 1} as Color;
    groupInnerInner.name = 'HorizonGroup';
    groupInnerInner.condition = 'on';
    groupInnerInner.content = line;

    const groupInner = new ClassGroup();
    groupInner.name = 'OuterGroup';
    groupInner.content = groupInnerInner;

    const groupOuter = new ClassGroup();
    groupOuter.color = {r: 0.1, g: 0.2, b: 0.3, a: 1} as Color;
    groupOuter.name = 'Draw';
    groupOuter.content = groupInner;

    const groupOuterOuter = new ClassGroup();
    groupOuterOuter.color = {r: 0.1, g: 0.2, b: 0.3, a: 1} as Color;
    groupOuterOuter.name = 'External';
    groupOuterOuter.content = groupInner;

    return this.renderObjectToString(groupOuterOuter);
  }

  private renderObjectToString(content: any): string {
    const objectType = this.getObjectType(content);
    switch (objectType) {
      case ObjectType.group: {
        const input = content as ClassGroup;
        if (input.content) {
          input.content = this.addIndentForEachLine(this.renderObjectToString(input.content));
        }
        return Mustache.render(this.templates.group, input);
      }
      case ObjectType.line: {
        return Mustache.render(this.templates.line, content);
      }
    }
  }

  private addIndentForEachLine(content: string): string {
    const regexSearch = content.includes('\n\t') ? /\n /g : /\n/g;
    const indent = content.includes('\n\t') ? '\n   ' : '\n  ';
    return content.replace(regexSearch, indent);
  }

  private getObjectType(object: any): ObjectType {
    if (object instanceof ClassGroup) {
      return ObjectType.group;
    } else if (object instanceof Line) {
      return ObjectType.line;
    }
  }
}

export enum ObjectType {
  group,
  line
}

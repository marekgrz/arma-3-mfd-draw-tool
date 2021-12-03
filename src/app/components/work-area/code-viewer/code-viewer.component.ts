import { Component, OnDestroy } from '@angular/core';
import { TreeService } from '../../left-side/layer-stack/mat-tree/tree.service';
import { ClassGroup } from '../../../templates/ClassGroup';
import { ElementParserService } from '../../../utils/element-parser.service';
import * as Mustache from 'mustache';
import { MustacheTemplates, MustacheTemplatesService } from './mustache-templates.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ElementType } from '../../../common/BaseElementModel';

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
  }

  private renderObjectToString(content: any): string {
    switch (content.type) {
      case ElementType.group: {
        const input = content as ClassGroup;
        if (input.content) {
          input.contentText = this.addIndentForEachLine(this.getInnerContent(input));
        }
        return Mustache.render(this.templates.group, input);
      }
      case ElementType.line: {
        return Mustache.render(this.templates.line, content);
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
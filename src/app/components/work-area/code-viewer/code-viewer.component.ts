import { Component, OnInit } from '@angular/core';
import { TreeService } from '../../left-side/layer-stack/mat-tree/tree.service';
import { ClassGroup } from '../../../templates/ClassGroup';
import { Line, LineType } from '../../../templates/Line';
import { Color } from '@angular-material-components/color-picker';
import { ElementParserService } from '../../../utils/element-parser.service';
import * as Mustache from 'mustache'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mfd-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnInit {

  structuredText = '';

  constructor(private elementParser: ElementParserService,
              private treeService: TreeService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadTemplate('line.mustache');
  }

  // MUST BE STRING


  loadTemplate(templateName: string): void {
    //console.log(this.elementParser.getMFDClass())
    const line = new Line();
    line.color = {r: 0.5, g: 0.5, b: 0.5, a: 0.5} as Color;
    line.name = 'Line_1';
    line.lineType = LineType.dashed;
    line.width = 2;

    const groupInner = new ClassGroup();
    groupInner.color = {r: 0.1, g: 0.2, b: 0.3, a: 1} as Color;
    groupInner.name = 'HorizonGroup';
    groupInner.condition = 'on';
    groupInner.content = line;

    const groupOuter = new ClassGroup();
    groupOuter.color = {r: 0.1, g: 0.2, b: 0.3, a: 1} as Color;
    groupOuter.name = 'Draw';
    groupOuter.content = line;

    this.http.get(`./assets/templates/${templateName}`, {responseType: 'text'}).subscribe(data => {
      groupInner.content = Mustache.render(data, line);
      this.http.get(`./assets/templates/group.mustache`, {responseType: 'text'}).subscribe(resp => {
        groupOuter.content = Mustache.render(data, groupInner);
        this.http.get(`./assets/templates/group.mustache`, {responseType: 'text'}).subscribe(resp => {
          this.structuredText = Mustache.render(resp, groupOuter);
          console.log(this.structuredText);
        });
      });
    });
  }
}

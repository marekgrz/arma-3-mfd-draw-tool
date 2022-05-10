import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Builder } from 'builder-pattern';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private templates = [
    'group',
    'line',
    'mfd_parent',
    'polygon',
    'text'
  ];

  constructor(private httpClient: HttpClient) {
  }

  loadTemplates(): Observable<MustacheTemplates> {
    return new Observable<MustacheTemplates>(observer => {
      this.fetchTemplates().subscribe(templates => {
        observer.next(this.getMustacheTemplates(templates));
        observer.complete();
      });
    });
  }

  private getMustacheTemplates(message: TemplateData[]): MustacheTemplates {
    return Builder(MustacheTemplates)
      .mfdParent(message.find(it => it.name === 'mfd_parent')?.template)
      .group(message.find(it => it.name === 'group')?.template)
      .line(message.find(it => it.name === 'line')?.template)
      .polygon(message.find(it => it.name === 'polygon')?.template)
      .text(message.find(it => it.name === 'text')?.template)
      .build();
  }

  private fetchTemplates(): Observable<TemplateData[]> {
    const fetchTemplateList: Observable<string>[] = this.templates
      .map(templateName => this.httpClient.get(`assets/templates/${templateName}.mustache`, {responseType: 'text'}));

    return forkJoin(fetchTemplateList)
      .pipe(map(templateList => templateList
        .map((template, index) => new TemplateData(this.templates[index], template)))
      );
  }
}

export class TemplateData {
  name;
  template;

  constructor(name, template) {
    this.name = name;
    this.template = template;
  }
}

export class MustacheTemplates {
  mfdParent: string;
  group: string;
  line: string;
  polygon: string;
  text: string;
}

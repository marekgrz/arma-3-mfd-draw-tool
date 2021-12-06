import { Injectable } from '@angular/core';
import { IpcService } from '../../../utils/ipc.service';
import { Builder } from 'builder-pattern';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MustacheTemplatesService {

  templates: MustacheTemplates;

  constructor(private ipc: IpcService) {}

  loadTemplates(): Observable<MustacheTemplates> {
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
      .group(message.find(it => it.name === 'group')?.template)
      .line(message.find(it => it.name === 'line')?.template)
      .polygon(message.find(it => it.name === 'polygon')?.template)
      .build();
    this.templates = templates;
    return templates;
  }
}

export interface TemplateData {
  name: string;
  template: string;
}

export class MustacheTemplates {
  group: string;
  line: string;
  polygon: string;
}

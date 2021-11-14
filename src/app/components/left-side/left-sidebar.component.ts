import { Component, Input } from '@angular/core';

@Component({
  selector: 'mfd-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.less']
})
export class LeftSidebarComponent {

  @Input()
  previewMode: boolean;

  constructor() { }
}

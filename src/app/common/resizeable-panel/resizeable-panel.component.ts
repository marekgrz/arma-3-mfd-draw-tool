import { Component, Input } from '@angular/core';

@Component({
  selector: 'mfd-resizeable-panel',
  templateUrl: './resizeable-panel.component.html',
  styleUrls: ['./resizeable-panel.component.less']
})
export class ResizeablePanelComponent {

  @Input()
  maximumWidth = 900;

  @Input()
  minimumWidth = 200;

  @Input()
  horizontal = false;

  @Input()
  position: 'top' | 'bottom' | 'left' | 'right' = 'right';

  @Input()
  panelName: string = undefined;

  constructor() {
  }
}

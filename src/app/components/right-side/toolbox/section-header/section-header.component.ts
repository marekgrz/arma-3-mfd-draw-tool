import { Component, Input } from '@angular/core';

@Component({
  selector: 'mfd-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.less']
})
export class SectionHeaderComponent {

  @Input()
  label: string;

  constructor() {
  }
}

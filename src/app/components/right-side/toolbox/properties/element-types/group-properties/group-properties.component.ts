import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack-ng/elements/StackItem';

@Component({
  selector: 'mfd-group-properties',
  templateUrl: './group-properties.component.html',
  styleUrls: ['./group-properties.component.less']
})
export class GroupPropertiesComponent implements OnInit {

  @Input()
  item: StackItem;

  constructor() {
  }

  ngOnInit(): void {
  }
}

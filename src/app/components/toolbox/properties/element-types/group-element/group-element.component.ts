import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';

@Component({
  selector: 'app-group-element',
  templateUrl: './group-element.component.html',
  styleUrls: ['./group-element.component.less']
})
export class GroupElementComponent implements OnInit {

  @Input()
  item: StackItem;

  constructor() {
  }

  ngOnInit(): void {
  }


}

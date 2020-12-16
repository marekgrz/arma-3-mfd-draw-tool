import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';

@Component({
  selector: 'app-rectangle-element',
  templateUrl: './rectangle-element.component.html',
  styleUrls: ['./rectangle-element.component.less']
})
export class RectangleElementComponent implements OnInit {

  @Input()
  item: StackItem;

  constructor() { }

  ngOnInit(): void {
  }

}

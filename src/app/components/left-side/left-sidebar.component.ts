import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mfd-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.less']
})
export class LeftSidebarComponent implements OnInit {

  @Input()
  previewMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { BoneFixedModel } from '../../BoneBaseModel';

@Component({
  selector: 'app-bone-fixed',
  templateUrl: './bone-fixed.component.html',
  styleUrls: ['./bone-fixed.component.less']
})
export class BoneFixedComponent implements OnInit {

  @Input()
  bone: BoneFixedModel;

  constructor() { }

  ngOnInit(): void {
  }

}

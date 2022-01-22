import { Component, Input, OnInit } from '@angular/core';
import { BoneFixedModel } from '../../BoneBaseModel';

@Component({
  selector: 'mfd-bone-fixed',
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

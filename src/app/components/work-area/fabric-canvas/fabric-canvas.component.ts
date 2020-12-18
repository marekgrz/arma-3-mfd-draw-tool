import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../utils/store.service';

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements OnInit {

  config = {};

  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }

}

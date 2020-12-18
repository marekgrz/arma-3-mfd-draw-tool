import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less']
})
export class ElementListComponent implements OnInit {

  searchValue = '';
  elementTypes: string[];
  private allElementTypes: string[] = ['Rectangle', 'Line', 'Text'];


  constructor() {
  }

  ngOnInit(): void {
    this.elementTypes = [...this.allElementTypes];
  }

  filterOptions(): void {
    this.elementTypes = this.allElementTypes
      .filter(it => it.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  addLine(): void {
    const canvas =  new fabric.Canvas('fabric_canvas');
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    canvas.selection = true;
    canvas.add(rect);
  }
}

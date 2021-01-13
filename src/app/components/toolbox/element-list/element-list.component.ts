import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less']
})
export class ElementListComponent implements OnInit {

  searchValue = '';
  elementTypes: string[];
  private allElementTypes: string[] = ['Rectangle', 'Line', 'Text', 'Texture'];

  constructor() {
  }

  ngOnInit(): void {
    this.elementTypes = [...this.allElementTypes];
  }

  filterOptions(): void {
    this.elementTypes = this.allElementTypes.filter(it => it.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}

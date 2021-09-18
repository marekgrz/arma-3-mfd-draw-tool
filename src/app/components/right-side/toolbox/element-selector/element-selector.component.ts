import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrls: ['./element-selector.component.less']
})
export class ElementSelectorComponent implements OnInit {

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

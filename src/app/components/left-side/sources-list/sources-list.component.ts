import { Component, OnInit } from '@angular/core';
import { SourceService } from '../../../utils/source.service';

@Component({
  selector: 'mfd-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.less']
})
export class SourcesListComponent implements OnInit {

  sourceNames: string[];

  filteredNames: string[];

  searchValue = '';

  constructor(public sources: SourceService) {
    this.sourceNames = Object.keys(sources).filter(it => it !== 'store');
    this.filterOptions();
  }

  ngOnInit(): void {
  }

  refreshSources(event, sourceName): void {
    this.sources[sourceName] = event.value;
    this.sources.refreshSourcesInCanvas();
  }

  filterOptions(): void {
    this.filteredNames = this.sourceNames.filter(it => it.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}

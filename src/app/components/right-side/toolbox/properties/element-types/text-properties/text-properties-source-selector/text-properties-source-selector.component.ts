import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SourceService } from '../../../../../../../utils/source.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSourceDialogComponent } from './text-properties-source-selector-new/create-source-dialog.component';

@Component({
  selector: 'mfd-text-properties-source-selector',
  templateUrl: './text-properties-source-selector.component.html',
  styleUrls: ['./text-properties-source-selector.component.less']
})
export class TextPropertiesSourceSelectorComponent {

  @Input()
  source: string;

  @Output()
  sourceChange = new EventEmitter<string>();

  @Input()
  sourceScale: any;

  @Output()
  sourceScaleChange = new EventEmitter<any>();

  @Output()
  refreshText: EventEmitter<any> = new EventEmitter<any>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  sourceValue = 0;
  searchValue = '';
  filteredOptions: string[];
  allOptions: string[];

  constructor(private sourceService: SourceService,
              private dialog: MatDialog,) {
    this.setSourceList();
  }

  filterOptions(): void {
    this.filteredOptions = this.searchValue.length < 1
      ? [...this.allOptions]
      : this.allOptions.filter(item => item.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  addCustomOption(): void {
    const dialogRef = this.dialog.open(CreateSourceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sourceService.sources.set(result, 0);
        this.setSourceList();
        this.searchValue = '';
      }
    });

  }

  private setSourceList(): void {
    this.allOptions = Array.from(this.sourceService.sources.keys());
    this.filteredOptions = [...this.allOptions];
  }
}

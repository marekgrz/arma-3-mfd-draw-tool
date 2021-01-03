import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnInit {

  constructor(private treeService: TreeService) {
  }

  ngOnInit(): void {
  }

  getCode(): string {
    return JSON.stringify(this.treeService.itemList, null, '  ');
  }

}

import {Component, OnInit} from '@angular/core';
import {TreeService} from '../../layer-stack/mat-tree/tree.service';
import {BaseShape} from '../../../common/BaseShape';
import {ClassGroup} from '../../../templates/ClassGroup';
import {Line} from '../../../templates/Line';
import {ElementType, StackItem} from '../../layer-stack/elements/StackItem';
import {Color} from '@angular-material-components/color-picker';
import {Polygon} from '../../../templates/Polygon';
import {Point} from '../../../common/Point';
import {ElementParserService} from '../../../utils/element-parser.service';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less']
})
export class CodeViewerComponent implements OnInit {

  constructor(private elementParser: ElementParserService) {
  }

  ngOnInit(): void {
  }

  // MUST BE STRING
  getCode(): string {
    return this.elementParser.getMFDClass();
  }
}

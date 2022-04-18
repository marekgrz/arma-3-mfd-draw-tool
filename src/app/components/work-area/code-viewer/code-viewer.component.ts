import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TreeService } from '../../left-side/layer-stack-ng/tree.service';
import { ElementParserService } from '../../../utils/element-parser.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ArmaFormatterService } from './arma-formatter.service';

@Component({
  selector: 'mfd-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeViewerComponent implements OnDestroy, OnInit {

  private subscription: Subscription = null;

  structuredText: string;

  constructor(private elementParser: ElementParserService,
              private treeService: TreeService,
              private armaFormatter: ArmaFormatterService,
              private toastrService: ToastrService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.armaFormatter.getFormattedText()
      .subscribe(value => {
          this.structuredText = value;
          this.changeDetector.detectChanges();
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCopy(): void {
    this.toastrService.info('Copied to clipboard', '', {timeOut: 1000});
  }
}
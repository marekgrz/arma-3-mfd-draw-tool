import { Component } from '@angular/core';
import { StoreService } from '../../../../../../utils/store.service';
import { TreeService } from '../../../../../left-side/layer-stack-ng/tree.service';
import { fabric } from 'fabric';
import { generateId } from '../../../../../left-side/layer-stack-ng/elements/StackItem';
import { ID, SOURCE, SOURCE_SCALE } from '../../../../../../common/ProjectFileStructure';
import { BaseElementType } from '../base-element-type.directive';
import { HistoryService } from '../../../../../../utils/history.service';

@Component({
  selector: 'mfd-text-type',
  templateUrl: './text-type.component.html',
  styleUrls: ['./text-type.component.less']
})
export class TextTypeComponent extends BaseElementType {


  constructor(store: StoreService,
              historyService: HistoryService,
              treeService: TreeService) {
    super(store, historyService, treeService);
  }

  addText(): void {
    const text = new fabric.Textbox('Text', {
      left: 100, top: 100,
      fill: '#000000',
      fontFamily: 'RobotoCondensed',
      textAlign: 'center',
      originX: 'center',
      padding: 0,
      fontSize: 50,
      lockRotation: true,
    });
    text[ID] = generateId();
    text[SOURCE] = 'static';
    text[SOURCE_SCALE] = 1;
    this.createNewElement(this.treeService.itemFromText(text));
  }
}

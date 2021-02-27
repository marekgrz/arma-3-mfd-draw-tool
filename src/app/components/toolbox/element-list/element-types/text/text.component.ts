import {Component} from '@angular/core';
import {StoreService} from '../../../../../utils/store.service';
import {TreeService} from '../../../../layer-stack/mat-tree/tree.service';
import {fabric} from 'fabric';
import {generateId} from '../../../../layer-stack/elements/StackItem';
import {ID} from '../../../../../common/ProjectFileStructure';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.less']
})
export class TextComponent {

  constructor(private store: StoreService,
              private treeService: TreeService) {
  }

  addText(): void {
    const text = new fabric.Text('Text', {
      left: 100, top: 100,
      fontFamily: 'RobotoCondensed',
      textAlign: 'center',
      fontSize: 50,
    });
    text[ID] = generateId();
    this.store.canvas.add(text);
    this.treeService.pushToListInCorrectPlace(this.treeService.itemFromText(text));
  }
}

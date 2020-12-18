import {Component, Input, OnInit} from '@angular/core';
import {StackItem} from '../../../../layer-stack/elements/StackItem';
import {StoreService} from '../../../../../utils/store.service';
import {FormControl} from '@angular/forms';
import {FileInput} from 'ngx-material-file-input';

@Component({
  selector: 'app-root-element',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {

  @Input()
  item: StackItem;

  width: number;
  height: number;

  file = new FormControl('');
  color: FormControl;
  defaultFile: FileInput;
  useImage = false;

  constructor(public store: StoreService) {
    this.width = store.canvasWidth;
    this.height = store.canvasHeight;
    this.useImage = this.store.canvasUseImage;
    this.defaultFile = new FileInput(this.store.backGroundFile != null ? [this.store.backGroundFile] : []);
    this.color = new FormControl(this.store.canvasBackGroundColor);
  }

  ngOnInit(): void {
  }

  updateDimensions(): void {
    this.store.canvasHeight = this.height;
    this.store.canvasWidth = this.width;
    this.store.aspectRatio = this.width / this.height;
    if (this.useImage) {
      if (this.file.value) {
        const reader = new FileReader();
        reader.readAsDataURL(this.file.value.files[0]);
        reader.onload = (event) => {
          this.store.canvasBackgroundImg = event.target.result.toString();
          this.store.backGroundFile = this.file.value.files[0];
        };
      }
    } else {
      this.store.canvasBackGroundColor = this.color.value;
    }
    this.store.canvasUseImage = this.useImage;
  }
}

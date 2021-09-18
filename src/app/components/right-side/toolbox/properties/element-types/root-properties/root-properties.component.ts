import { Component, Input, OnInit } from '@angular/core';
import { StackItem } from '../../../../../left-side/layer-stack/elements/StackItem';
import { StoreService } from '../../../../../../utils/store.service';
import { FormControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-root-properties',
  templateUrl: './root-properties.component.html',
  styleUrls: ['./root-properties.component.less']
})
export class RootPropertiesComponent implements OnInit {

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
    this.defaultFile = new FileInput(this.store.canvasBackgroundFile != null ? [this.store.canvasBackgroundFile] : []);
    this.color = new FormControl(this.store.canvasBackGroundColor);
  }

  ngOnInit(): void {
  }

  updateCanvasOptions(): void {
    this.store.canvasHeight = this.height;
    this.store.canvasWidth = this.width;
    this.store.canvasAspectRatio = this.width / this.height;
    if (this.useImage) {
      if (this.file.value) {
        const reader = new FileReader();
        reader.readAsDataURL(this.file.value.files[0]);
        reader.onload = (event) => {
          this.store.canvasBackgroundImg = event.target.result.toString();
          this.store.canvasBackgroundFile = this.file.value.files[0];
        };
      }
    } else {
      this.store.canvasBackGroundColor = this.color.value;
    }
    this.store.canvasUseImage = this.useImage;
    this.store.updateCanvas();
  }
}

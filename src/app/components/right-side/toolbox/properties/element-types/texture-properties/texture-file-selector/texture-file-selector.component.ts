import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Builder } from 'builder-pattern';

@Component({
  selector: 'mfd-texture-file-selector',
  templateUrl: './texture-file-selector.component.html',
  styleUrls: ['./texture-file-selector.component.less']
})
export class TextureFileSelectorComponent {

  @Input()
  file: TextureFile = new TextureFile();

  @Output()
  fileChange: EventEmitter<TextureFile> = new EventEmitter<TextureFile>();

  constructor() {}

  openTexture(): void {
    console.log('Clicked');
  }

  handleFileInput(files: FileList): void {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = event => {
        const fileData = event.target.result.toString();
        this.file = Builder(TextureFile)
          .name(files[0].name)
          .filePath(files[0].path)
          .relativePath(files[0].path)
          .data(fileData)
          .build();
        this.fileChange.emit(this.file);
      };
    }
  }
}

export class TextureFile {
  name: string;
  filePath: string;
  relativePath: string;
  data: string;
}
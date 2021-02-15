import {Component} from '@angular/core';
import {StoreService} from './utils/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'arma-mfd-drawer';

  showToolbox = true;

  previewMode = false;

  constructor(public store: StoreService) {
  }
}

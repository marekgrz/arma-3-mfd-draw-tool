import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HederMenuComponent} from './components/heder-menu/heder-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {LayerListComponent} from './components/layer-stack/layer-list/layer-list.component';
import {ToolboxComponent} from './components/toolbox/toolbox.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {WorkAreaComponent} from './components/work-area/work-area.component';
import {ElementListComponent} from './components/toolbox/element-list/element-list.component';
import {PropertiesComponent} from './components/toolbox/properties/properties.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule, MatSelectionList} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {NgxTreeDndModule} from 'ngx-tree-dnd';

@NgModule({
  declarations: [
    AppComponent,
    HederMenuComponent,
    LayerListComponent,
    ToolboxComponent,
    WorkAreaComponent,
    ElementListComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    FormsModule,
    NgxTreeDndModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

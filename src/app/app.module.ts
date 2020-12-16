import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HederMenuComponent} from './components/heder-menu/heder-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ToolboxComponent} from './components/toolbox/toolbox.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {WorkAreaComponent} from './components/work-area/work-area.component';
import {ElementListComponent} from './components/toolbox/element-list/element-list.component';
import {PropertiesComponent} from './components/toolbox/properties/properties.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTreeComponent} from './components/layer-stack/mat-tree/mat-tree.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatTreeItemListComponent} from './components/layer-stack/mat-tree/mat-tree-item-list/mat-tree-item-list.component';
import {LayerStackComponent} from './components/layer-stack/layer-stack.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupElementComponent } from './components/toolbox/properties/element-types/group-element/group-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HederMenuComponent,
    LayerStackComponent,
    ToolboxComponent,
    WorkAreaComponent,
    ElementListComponent,
    PropertiesComponent,
    MatTreeComponent,
    MatTreeItemListComponent,
    GroupElementComponent,
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
    MatTreeModule,
    DragDropModule,
    SortablejsModule.forRoot({animation: 150}),
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

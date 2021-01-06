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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTreeComponent} from './components/layer-stack/mat-tree/mat-tree.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatTreeItemListComponent} from './components/layer-stack/mat-tree/mat-tree-item-list/mat-tree-item-list.component';
import {LayerStackComponent} from './components/layer-stack/layer-stack.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {GroupElementComponent} from './components/toolbox/properties/element-types/group-element/group-element.component';
import {RectangleElementComponent} from './components/toolbox/properties/element-types/rectangle-element/rectangle-element.component';
import {FabricModule} from 'ngx-fabric-wrapper';
import {FabricCanvasComponent} from './components/work-area/fabric-canvas/fabric-canvas.component';
import {RootComponent} from './components/toolbox/properties/element-types/root/root.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule} from '@angular-material-components/color-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TextureElementComponent} from './components/toolbox/properties/element-types/texture-element/texture-element.component';
import {CircleElementComponent} from './components/toolbox/properties/element-types/circle-element/circle-element.component';
import {PolygonRectElementComponent} from './components/toolbox/properties/element-types/polygon-rect-element/polygon-rect-element.component';
import {PolygonTriangleElementComponent} from './components/toolbox/properties/element-types/polygon-triangle-element/polygon-triangle-element.component';
import {TriangleElementComponent} from './components/toolbox/properties/element-types/triangle-element/triangle-element.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LineElementComponent} from './components/toolbox/properties/element-types/line-element/line-element.component';
import {CodeViewerComponent} from './components/work-area/code-viewer/code-viewer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions} from 'ngx-highlightjs';
import {ToastrModule} from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    RectangleElementComponent,
    FabricCanvasComponent,
    RootComponent,
    TextureElementComponent,
    CircleElementComponent,
    PolygonRectElementComponent,
    PolygonTriangleElementComponent,
    TriangleElementComponent,
    LineElementComponent,
    CodeViewerComponent,
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
    FabricModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    HighlightModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers: true,
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
      } as HighlightOptions
    },
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

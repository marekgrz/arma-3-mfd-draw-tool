import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderMenuComponent } from './components/heder-menu/header-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RightSidebarComponent } from './components/right-side/toolbox/right-sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorkAreaComponent } from './components/work-area/work-area.component';
import { ElementSelectorComponent } from './components/right-side/toolbox/element-selector/element-selector.component';
import { PropertiesComponent } from './components/right-side/toolbox/properties/properties.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortablejsModule } from 'ngx-sortablejs';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupPropertiesComponent } from './components/right-side/toolbox/properties/element-types/group-properties/group-properties.component';
import { RectanglePropertiesComponent } from './components/right-side/toolbox/properties/element-types/rectangle-properties/rectangle-properties.component';
import { FabricModule } from 'ngx-fabric-wrapper';
import { FabricCanvasComponent } from './components/work-area/fabric-canvas/fabric-canvas.component';
import { RootPropertiesComponent } from './components/right-side/toolbox/properties/element-types/root-properties/root-properties.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TexturePropertiesComponent } from './components/right-side/toolbox/properties/element-types/texture-properties/texture-properties.component';
import { CirclePropertiesComponent } from './components/right-side/toolbox/properties/element-types/circle-properties/circle-properties.component';
import { PolygonRectanglePropertiesComponent } from './components/right-side/toolbox/properties/element-types/polygon-rectangle-properties/polygon-rectangle-properties.component';
import { PolygonTrianglePropertiesComponent } from './components/right-side/toolbox/properties/element-types/polygon-triangle-properties/polygon-triangle-properties.component';
import { TrianglePropertiesComponent } from './components/right-side/toolbox/properties/element-types/triangle-properties/triangle-properties.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LinePropertiesComponent } from './components/right-side/toolbox/properties/element-types/line-properties/line-properties.component';
import { CodeViewerComponent } from './components/work-area/code-viewer/code-viewer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions } from 'ngx-highlightjs';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { NewProjectDialogComponent } from './components/dialogs/new-project-dialog/new-project-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { LineTypeComponent } from './components/right-side/toolbox/element-selector/element-types/line-type/line-type.component';
import { RectangleTypeComponent } from './components/right-side/toolbox/element-selector/element-types/rectangle-type/rectangle-type.component';
import { TriangleTypeComponent } from './components/right-side/toolbox/element-selector/element-types/triangle-type/triangle-type.component';
import { CircleTypeComponent } from './components/right-side/toolbox/element-selector/element-types/circle-type/circle-type.component';
import { TextureTypeComponent } from './components/right-side/toolbox/element-selector/element-types/texture-type/texture-type.component';
import { PolygonRectangleTypeComponent } from './components/right-side/toolbox/element-selector/element-types/polygon-rectangle-type/polygon-rectangle-type.component';
import { PolygonTriangleTypeComponent } from './components/right-side/toolbox/element-selector/element-types/polygon-triangle-type/polygon-triangle-type.component';
import { TextTypeComponent } from './components/right-side/toolbox/element-selector/element-types/text-type/text-type.component';
import { TextPropertiesComponent } from './components/right-side/toolbox/properties/element-types/text-properties/text-properties.component';
import { NotClickableDirective } from './utils/not-clickable.directive';
import { SourcesListComponent } from './components/left-side/sources-list/sources-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { BonesListComponent } from './components/left-side/bones-list/bones-list.component';
import { LeftSidebarComponent } from './components/left-side/left-sidebar.component';
import { NewBoneDialogComponent } from './components/left-side/bones-list/new-bone-dialog/new-bone-dialog.component';
import { BoneFixedComponent } from './components/left-side/bones-list/new-bone-dialog/bone-fixed/bone-fixed.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditBoneComponent } from './components/left-side/bones-list/edit-bone/edit-bone.component';
import { BonesSelectorComponent } from './components/right-side/toolbox/properties/element-types/common/bones-selector/bones-selector.component';
import { PositionInputComponent } from './components/right-side/toolbox/properties/element-types/common/position-input/position-input.component';
import { NameInputComponent } from './components/right-side/toolbox/properties/element-types/common/name-input/name-input.component';
import { DimensionsInputComponent } from './components/right-side/toolbox/properties/element-types/common/dimensions-input/dimensions-input.component';
import { ResizeBarComponent } from './common/resize-bar/resize-bar.component';
import { TreeModule } from 'primeng/tree';
import { SectionHeaderComponent } from './components/right-side/toolbox/section-header/section-header.component';
import { ColorSelectorComponent } from './components/right-side/toolbox/properties/element-types/common/color-selector/color-selector.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TextureFileSelectorComponent } from './components/right-side/toolbox/properties/element-types/texture-properties/texture-file-selector/texture-file-selector.component';
import { SpinnerOverlayComponent } from './components/dialogs/spinner-overlay/spinner-overlay.component';
import { LayerStackComponent } from './components/left-side/layer-stack-ng/layer-stack.component';
import { LayerStackActionsHeaderComponent } from './components/left-side/layer-stack-ng/layer-stack-actions-header/layer-stack-actions-header.component';
import { ResizeablePanelComponent } from './common/resizeable-panel/resizeable-panel.component';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    LayerStackComponent,
    RightSidebarComponent,
    WorkAreaComponent,
    ElementSelectorComponent,
    PropertiesComponent,
    GroupPropertiesComponent,
    RectanglePropertiesComponent,
    FabricCanvasComponent,
    RootPropertiesComponent,
    TexturePropertiesComponent,
    CirclePropertiesComponent,
    PolygonRectanglePropertiesComponent,
    PolygonTrianglePropertiesComponent,
    TrianglePropertiesComponent,
    LinePropertiesComponent,
    CodeViewerComponent,
    NewProjectDialogComponent,
    ConfirmDialogComponent,
    LineTypeComponent,
    RectangleTypeComponent,
    TriangleTypeComponent,
    CircleTypeComponent,
    TextureTypeComponent,
    PolygonRectangleTypeComponent,
    PolygonTriangleTypeComponent,
    TextTypeComponent,
    TextTypeComponent,
    TextPropertiesComponent,
    NotClickableDirective,
    SourcesListComponent,
    BonesListComponent,
    LeftSidebarComponent,
    NewBoneDialogComponent,
    BoneFixedComponent,
    EditBoneComponent,
    BonesSelectorComponent,
    PositionInputComponent,
    NameInputComponent,
    DimensionsInputComponent,
    ResizeBarComponent,
    SectionHeaderComponent,
    ColorSelectorComponent,
    TextureFileSelectorComponent,
    SpinnerOverlayComponent,
    LayerStackComponent,
    LayerStackActionsHeaderComponent,
    ResizeablePanelComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        ColorPickerModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        HighlightModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatSliderModule,
        MatMenuModule,
        TreeModule,
        ClipboardModule,
        ContextMenuModule,
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

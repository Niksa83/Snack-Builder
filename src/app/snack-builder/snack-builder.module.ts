import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { SnackBuilderComponent } from './containers/snack-builder/snack-builder.component';

// components
import { SnackFormComponent } from './components/snack-form/snack-form.component';
import { SnackCreatorComponent } from './components/snack-creator/snack-creator.component';
import { SnackIngredientsComponent } from './components/snack-ingredients/snack-ingredients.component';
import { SnackTotalComponent } from './components/snack-total/snack-total.component';
import { SnackPreviewComponent } from './components/snack-preview/snack-preview.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    SnackBuilderComponent,
    SnackFormComponent,
    SnackCreatorComponent,
    SnackIngredientsComponent,
    SnackTotalComponent,
    SnackPreviewComponent
  ],
  exports: [
    SnackBuilderComponent
  ]
})
export class SnackBuilderModule {}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
<<<<<<< HEAD
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';

=======
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
>>>>>>> tuan
@NgModule({
  declarations: [

  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
<<<<<<< HEAD
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSliderModule
=======
    MatDialogModule,
    MatProgressBarModule,
    MatTabsModule
>>>>>>> tuan
  ]
})
export class AngularMaterialModule { }

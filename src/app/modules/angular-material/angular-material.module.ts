import { NgModule } from '@angular/core';

import {MomentDateAdapter} from '@angular/material-moment-adapter';

import {

  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatMenuModule,
  MatTooltipModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  //NativeDateAdapter,
  MAT_DATE_FORMATS

} from "@angular/material";

import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
const moment= _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD', //como debemos escribirla en el input
  },
  display: {
    dateInput: 'll',// como se muestra en el input
    monthYearLabel: 'MMM YYYY', //como se muestra en la cabezera del datepicker
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MMM YYYY',
  }
};


@NgModule({
  imports: [

    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
   
  ],
  exports: [

    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ]
})
export class AngularMaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BzButtonModule,
  BzCardModule,
  BzDropdownModule,
  BzDatePickerModule,
  BzTimePickerModule,
  BzErrorModule,
  BzEventModule,
  BzIconModule,
  BzInputModule,
  BzSwitchModule,
  BzSwitch3Module,
  BzTableModule,
  BzTabsetModule,
  BzTextareaModule,
  BzToastrModule,
  BzTooltipModule,
  BzButtonsPanelModule,
  BzDialogModule
} from '@micegroup/voila2-blazing-ng';
import { UtilityPipeModule } from 'src/app/utilities/pipe/utility-pipe.module';
@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    BzButtonModule,
    BzCardModule,
    BzDatePickerModule,
    BzTimePickerModule,
    BzDropdownModule,
    BzErrorModule,
    BzEventModule,
    BzIconModule,
    BzInputModule,
    BzSwitchModule,
    BzSwitch3Module,
    BzTableModule,
    BzTabsetModule,
    BzTextareaModule,
    BzToastrModule,
    BzTooltipModule,
    BzButtonsPanelModule,
    BzDialogModule,
    UtilityPipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ]
})
export class SharedModule { }

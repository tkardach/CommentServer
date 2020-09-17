import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from './dialogs';



@NgModule({
  declarations: [ConfirmationDialog],
  imports: [
    CommonModule
  ],
  exports: [ConfirmationDialog]
})
export class ModalsModule { }

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

const materials = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [
    ...materials
  ],
  exports: [
    ...materials
  ]
})
export class MaterialsModule { }

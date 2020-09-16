import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const materials = [
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  exports: [
    ...materials
  ]
})
export class MaterialsModule { }

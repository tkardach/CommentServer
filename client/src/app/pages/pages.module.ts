import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';
import { ThreadComponent } from './thread/thread.component';
import { CommentsModule } from '../comments/comments.module';
import { CommentsService } from '../comments/comments.service';



@NgModule({
  declarations: [
    ThreadComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    CommentsModule
  ],
  exports: [
    ThreadComponent
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateCommentComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule
  ],
  exports: [CreateCommentComponent]
})
export class CommentsModule { }

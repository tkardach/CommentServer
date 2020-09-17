import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    CreateCommentComponent, 
    CommentComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule
  ],
  exports: [
    CreateCommentComponent,
    CommentComponent
  ]
})
export class CommentsModule { }

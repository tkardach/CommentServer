import { Component, OnInit } from '@angular/core';
import { IComment, CommentsService, INewComment } from 'src/app/comments/comments.service';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from 'src/app/comments/comment/comment.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/modals/dialogs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  comments: Array<IComment> = [];
  maxCharacters: number = 256;
  placeholder: string =  `Enter up to ${this.maxCharacters} characters`;
  private _threadName: string = '';

  constructor(
    private _commentsService: CommentsService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
      this._activatedRoute.paramMap.subscribe(async params => {
        this._threadName = params.get("threadName");
        if (this._threadName)
          this.init();
      });

      CommentComponent.commentReplyPosted.subscribe(
        comment => this.onNewComment(comment)
      )
    }

  ngOnInit(): void {
    if (this._threadName)
      this.init();
  }

  init(): void {
    if (this._threadName)
      this._commentsService.getCommentsForThread(this._threadName)
        .subscribe(
          result => {
            this.comments = result;
          },
          error => {
            console.log(error);
          }
        );
  }

  onNewComment(newComment: INewComment) {
    this._commentsService.postCommentToThread(this._threadName, newComment)
      .subscribe(
        result => {
          const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: '40%',
            data: {
              title: 'Comment Posted!',
              content: 'Your comment was successfully posted.'
            }
          });

          dialogRef.afterOpened().subscribe(_ => {
            setTimeout(() => {
               dialogRef.close();
            }, 3000)
          })

          dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            const dialogRef = this.dialog.open(ConfirmationDialog, {
              width: '40%',
              data: {
                title: `Error posting! Status ${error.status}`,
                content: error.message
              }
            });
          }
        }
      );
  }
}

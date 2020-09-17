import { Component, OnInit } from '@angular/core';
import { IComment, CommentsService, INewComment } from 'src/app/comments/comments.service';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from 'src/app/comments/comment/comment.component';

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
    private _activatedRoute: ActivatedRoute) {
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
          console.log(result);
          window.location.reload();
        },
        error => {
          console.log(error)
        }
      );
  }
}

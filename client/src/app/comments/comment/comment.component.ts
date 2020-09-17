import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComment, INewComment } from '../comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  static commentReplyPosted = new EventEmitter<INewComment>();
  @Output() replyPosted = new EventEmitter<INewComment>();

  // IComment attributes
  @Input() text: string = '';
  @Input() id: string = '';
  @Input() parent: string = '';
  @Input() replies: Array<IComment> = [];
  @Input() createdAt: Date = null;

  @Input() showReplies: boolean = false;
  @Input() placeholder: string = 'Enter Text Here';
  @Input() maxCharacters: number = 256;

  replying: boolean = false;

  constructor() {
    this.replyPosted.subscribe(
      comment => this.onCommentReplyPosted(comment)
    );
  }

  ngOnInit(): void {
  }

  replyClicked() {
    this.replying = true;
  }

  showRepliesClicked(show: boolean) {
    this.showReplies = show;
  }

  onReplyPosted(newComment: INewComment) {
    this.replyPosted.emit(newComment);
  }

  onCommentReplyPosted(newComment: INewComment) {
    CommentComponent.commentReplyPosted.emit(newComment);
  }
}

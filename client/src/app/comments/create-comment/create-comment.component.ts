import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INewComment } from '../comments.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  private _text: string = '';

  @Input() placeholder: string;
  @Input() maxCharacters: number = 256;
  
  @Output() textChange = new EventEmitter<string>();
  @Output() post = new EventEmitter<INewComment>();

  @Input() parent: string = null;

  @Input()
  get text(): string { return this._text; }
  set text(value: string) {
    value = value.substring(0, this.maxCharacters);
    this._text = value;
    this.textChange.emit(value);
  }



  constructor() { }

  ngOnInit(): void {
  }

  send() {
    const newComment: INewComment = {
      parent: this.parent,
      text: this.text
    }
    this.post.emit(newComment);
  }
}

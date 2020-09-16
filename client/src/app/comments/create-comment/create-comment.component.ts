import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input() placeholder: string;
  @Input() maxCharacters: number;

  @Input() commentText: string = "";
  @Output() commentTextChange = new EventEmitter<string>();

  @Output() post = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

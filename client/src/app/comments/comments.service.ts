import { Injectable } from '@angular/core';
import { CommentsModule } from './comments.module';
import { HttpClient } from '@angular/common/http';

export interface Comment {
  parent: string,
  text: string
}

@Injectable({
  providedIn: CommentsModule
})
export class CommentsService {

  constructor(private http: HttpClient) { }
}

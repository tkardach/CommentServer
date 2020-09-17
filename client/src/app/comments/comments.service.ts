import { Injectable } from '@angular/core';
import { CommentsModule } from './comments.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IComment {
  _id: string,
  parent: string,
  text: string,
  children: Array<IComment>,
  createdAt: Date
}

export interface INewComment {
  parent: string,
  text: string
}

@Injectable({
  providedIn: CommentsModule
})
export class CommentsService {
  readonly API_URL = '/api/comments/';
  
  private _headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCommentsForThread(thread: string): Observable<Array<IComment>> {
    return this.http.get<Array<IComment>>(this.API_URL + thread, {headers: this._headers});
  }

  postCommentToThread(thread: string, newComment: INewComment): Observable<IComment> {
    return this.http.post<IComment>(this.API_URL + thread, newComment, {headers: this._headers});
  }
}

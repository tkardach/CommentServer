import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService, IComment } from './comments.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

describe('CommentsService', () => {
  let testThread: string = 'thread1';
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Array<IComment>>', () => {
    const dummyComments: Array<IComment> = [
      {
        _id: '1234',
        text: 'Test Comment',
        parent: null,
        children: [{
          _id: '12345',
          text: 'Test Comment 2',
          parent: '1234',
          children: [],
          createdAt: new Date()
        }],
        createdAt: new Date()
      },
      {
        _id: '12346',
        text: 'Test Comment 2',
        parent: null,
        children: [],
        createdAt: new Date()
      }
    ];

    service.getCommentsForThread(testThread).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyComments);
    })

    httpMock.expectOne(`${service.API_URL}${testThread}`).flush(dummyComments);
  });

  it('should return return an HttpErrorResponse on error', () => {
    const dummyError: HttpErrorResponse = {
      error: "Error Message",
      name: "HttpErrorResponse",
      message: "Error Message",
      ok: false,
      headers: null,
      status: 400,
      statusText: '{"message": "Error Message"}',
      url: 'Error URL',
      type: HttpEventType.Response
    };

    service.getCommentsForThread(testThread).subscribe(data => {
    },
    error => {
      expect(error).toBe(dummyError);
    })

    httpMock.expectOne(`${service.API_URL}${testThread}`).flush(dummyError);
  });
});

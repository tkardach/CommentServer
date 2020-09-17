import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadComponent } from './thread.component';
import { CommentsService } from 'src/app/comments/comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ThreadComponent ],
      providers: [CommentsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentComponent } from './create-comment.component';
import { FormsModule } from '@angular/forms';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CreateCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise send event when post button clicked', () => {
    const expectedMessage = "TestMessage";
    component.text = expectedMessage;
    component.post.subscribe((message: string) => expect(message).toBe(expectedMessage));
    component.send();
  });

  it('should limit the number of characters in comment text to the specified amount', () => {
    const message = "a".repeat(6);
    const expected = "a".repeat(5);
    component.maxCharacters = 5;
    component.text = message;
    expect(component.text).toBe(expected);
  });
});

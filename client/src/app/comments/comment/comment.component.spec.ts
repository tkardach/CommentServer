import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise reply event on replyClicked', () => {
    component.reply.subscribe(() => {expect(true).toBeTruthy()});
    component.replyClicked();
  });

  it('should show replies on showRepliesClicked(true)', () => {
    component.showReplies = false;
    expect(component.showReplies).toBe(false);
    component.showRepliesClicked(true);
    expect(component.showReplies).toBe(true);
  });

  it('should hide replies on showRepliesClicked(false)', () => {
    component.showReplies = true;
    expect(component.showReplies).toBe(true);
    component.showRepliesClicked(false);
    expect(component.showReplies).toBe(false);
  });
});

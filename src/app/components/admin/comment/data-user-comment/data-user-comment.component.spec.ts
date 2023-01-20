import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUserCommentComponent } from './data-user-comment.component';

describe('DataUserCommentComponent', () => {
  let component: DataUserCommentComponent;
  let fixture: ComponentFixture<DataUserCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUserCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUserCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

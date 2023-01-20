import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCommentComponent } from './data-comment.component';

describe('DataCommentComponent', () => {
  let component: DataCommentComponent;
  let fixture: ComponentFixture<DataCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

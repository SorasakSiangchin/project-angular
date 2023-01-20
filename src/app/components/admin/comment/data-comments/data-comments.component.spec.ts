import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCommentsComponent } from './data-comments.component';

describe('DataCommentsComponent', () => {
  let component: DataCommentsComponent;
  let fixture: ComponentFixture<DataCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

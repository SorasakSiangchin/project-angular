import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespondCommenttComponent } from './admin-respond-commentt.component';

describe('AdminRespondCommenttComponent', () => {
  let component: AdminRespondCommenttComponent;
  let fixture: ComponentFixture<AdminRespondCommenttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRespondCommenttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRespondCommenttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

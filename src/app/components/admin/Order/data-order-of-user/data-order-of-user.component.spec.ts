import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOrderOfUserComponent } from './data-order-of-user.component';

describe('DataOrderOfUserComponent', () => {
  let component: DataOrderOfUserComponent;
  let fixture: ComponentFixture<DataOrderOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataOrderOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOrderOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

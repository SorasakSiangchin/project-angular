import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeproductComponent } from './data-typeproduct.component';

describe('DataTypeproductComponent', () => {
  let component: DataTypeproductComponent;
  let fixture: ComponentFixture<DataTypeproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTypeproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

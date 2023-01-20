import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProductDetailComponent } from './data-product-detail.component';

describe('DataProductDetailComponent', () => {
  let component: DataProductDetailComponent;
  let fixture: ComponentFixture<DataProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

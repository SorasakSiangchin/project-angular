import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOrderProductComponent } from './data-order-product.component';

describe('DataOrderProductComponent', () => {
  let component: DataOrderProductComponent;
  let fixture: ComponentFixture<DataOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataOrderProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagedetailproductCartComponent } from './imagedetailproduct-cart.component';

describe('ImagedetailproductCartComponent', () => {
  let component: ImagedetailproductCartComponent;
  let fixture: ComponentFixture<ImagedetailproductCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagedetailproductCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagedetailproductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

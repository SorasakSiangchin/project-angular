import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderProductComponent } from './create-order-product.component';

describe('CreateOrderProductComponent', () => {
  let component: CreateOrderProductComponent;
  let fixture: ComponentFixture<CreateOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

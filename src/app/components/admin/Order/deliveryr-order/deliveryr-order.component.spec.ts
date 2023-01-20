import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryrOrderComponent } from './deliveryr-order.component';

describe('DeliveryrOrderComponent', () => {
  let component: DeliveryrOrderComponent;
  let fixture: ComponentFixture<DeliveryrOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryrOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryrOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

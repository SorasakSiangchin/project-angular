import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderListComponent } from './detail-order-list.component';

describe('DetailOrderListComponent', () => {
  let component: DetailOrderListComponent;
  let fixture: ComponentFixture<DetailOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailproductComponent } from './data-detailproduct.component';

describe('DataDetailproductComponent', () => {
  let component: DataDetailproductComponent;
  let fixture: ComponentFixture<DataDetailproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDetailproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDetailproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

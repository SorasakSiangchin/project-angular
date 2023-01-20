import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDetailproductComponent } from './create-detailproduct.component';

describe('CreateDetailproductComponent', () => {
  let component: CreateDetailproductComponent;
  let fixture: ComponentFixture<CreateDetailproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDetailproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDetailproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

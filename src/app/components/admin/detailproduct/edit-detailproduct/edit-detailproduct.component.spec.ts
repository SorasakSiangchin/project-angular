import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailproductComponent } from './edit-detailproduct.component';

describe('EditDetailproductComponent', () => {
  let component: EditDetailproductComponent;
  let fixture: ComponentFixture<EditDetailproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

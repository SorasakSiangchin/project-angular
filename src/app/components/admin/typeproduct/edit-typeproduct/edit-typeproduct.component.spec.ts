import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeproductComponent } from './edit-typeproduct.component';

describe('EditTypeproductComponent', () => {
  let component: EditTypeproductComponent;
  let fixture: ComponentFixture<EditTypeproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTypeproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

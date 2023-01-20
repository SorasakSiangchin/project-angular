import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeproductComponent } from './create-typeproduct.component';

describe('CreateTypeproductComponent', () => {
  let component: CreateTypeproductComponent;
  let fixture: ComponentFixture<CreateTypeproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTypeproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

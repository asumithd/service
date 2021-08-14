import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddattributesComponent } from './addattributes.component';

describe('AddattributesComponent', () => {
  let component: AddattributesComponent;
  let fixture: ComponentFixture<AddattributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddattributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

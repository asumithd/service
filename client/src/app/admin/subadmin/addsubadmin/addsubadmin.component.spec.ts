import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubadminComponent } from './addsubadmin.component';

describe('AddsubadminComponent', () => {
  let component: AddsubadminComponent;
  let fixture: ComponentFixture<AddsubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

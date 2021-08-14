import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationbarComponent } from './locationbar.component';

describe('LocationbarComponent', () => {
  let component: LocationbarComponent;
  let fixture: ComponentFixture<LocationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

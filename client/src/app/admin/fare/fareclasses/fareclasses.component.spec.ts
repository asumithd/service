import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareclassesComponent } from './fareclasses.component';

describe('FareclassesComponent', () => {
  let component: FareclassesComponent;
  let fixture: ComponentFixture<FareclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

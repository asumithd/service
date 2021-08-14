import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverslistComponent } from './driverslist.component';

describe('DriverslistComponent', () => {
  let component: DriverslistComponent;
  let fixture: ComponentFixture<DriverslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiontrackerComponent } from './directiontracker.component';

describe('DirectiontrackerComponent', () => {
  let component: DirectiontrackerComponent;
  let fixture: ComponentFixture<DirectiontrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiontrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiontrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

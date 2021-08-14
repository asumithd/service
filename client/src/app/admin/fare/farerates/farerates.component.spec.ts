import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareratesComponent } from './farerates.component';

describe('FareratesComponent', () => {
  let component: FareratesComponent;
  let fixture: ComponentFixture<FareratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

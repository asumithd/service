import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeslistComponent } from './attributeslist.component';

describe('AttributeslistComponent', () => {
  let component: AttributeslistComponent;
  let fixture: ComponentFixture<AttributeslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

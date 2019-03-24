import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpagePage } from './modalpage.page';

describe('ModalpagePage', () => {
  let component: ModalpagePage;
  let fixture: ComponentFixture<ModalpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

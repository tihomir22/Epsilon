import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesPage } from './ajustes.page';

describe('AjustesPage', () => {
  let component: AjustesPage;
  let fixture: ComponentFixture<AjustesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

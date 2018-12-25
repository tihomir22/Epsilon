import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActivosPage } from './agregar-activos.page';

describe('AgregarActivosPage', () => {
  let component: AgregarActivosPage;
  let fixture: ComponentFixture<AgregarActivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarActivosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarActivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

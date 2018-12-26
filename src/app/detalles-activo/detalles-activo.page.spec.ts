import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesActivoPage } from './detalles-activo.page';

describe('DetallesActivoPage', () => {
  let component: DetallesActivoPage;
  let fixture: ComponentFixture<DetallesActivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesActivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesActivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

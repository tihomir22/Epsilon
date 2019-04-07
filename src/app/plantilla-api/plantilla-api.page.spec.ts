import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaAPIPage } from './plantilla-api.page';

describe('PlantillaAPIPage', () => {
  let component: PlantillaAPIPage;
  let fixture: ComponentFixture<PlantillaAPIPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaAPIPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaAPIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

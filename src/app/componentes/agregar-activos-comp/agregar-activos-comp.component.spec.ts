import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActivosCompComponent } from './agregar-activos-comp.component';

describe('AgregarActivosCompComponent', () => {
  let component: AgregarActivosCompComponent;
  let fixture: ComponentFixture<AgregarActivosCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarActivosCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarActivosCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenesTransaccionesComponent } from './listado-ordenes-transacciones.component';

describe('ListadoOrdenesTransaccionesComponent', () => {
  let component: ListadoOrdenesTransaccionesComponent;
  let fixture: ComponentFixture<ListadoOrdenesTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoOrdenesTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoOrdenesTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

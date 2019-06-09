import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConversacionComponent } from './detalle-conversacion.component';

describe('DetalleConversacionComponent', () => {
  let component: DetalleConversacionComponent;
  let fixture: ComponentFixture<DetalleConversacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConversacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConversacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

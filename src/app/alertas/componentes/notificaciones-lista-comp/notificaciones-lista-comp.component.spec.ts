import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesListaCompComponent } from './notificaciones-lista-comp.component';

describe('NotificacionesListaCompComponent', () => {
  let component: NotificacionesListaCompComponent;
  let fixture: ComponentFixture<NotificacionesListaCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesListaCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesListaCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

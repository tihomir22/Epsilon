import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionApiComponent } from './seleccion-api.component';

describe('SeleccionApiComponent', () => {
  let component: SeleccionApiComponent;
  let fixture: ComponentFixture<SeleccionApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

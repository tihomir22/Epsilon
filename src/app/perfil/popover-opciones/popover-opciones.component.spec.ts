import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverOpcionesComponent } from './popover-opciones.component';

describe('PopoverOpcionesComponent', () => {
  let component: PopoverOpcionesComponent;
  let fixture: ComponentFixture<PopoverOpcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverOpcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

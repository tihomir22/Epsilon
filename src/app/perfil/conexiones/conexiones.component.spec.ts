import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionesComponent } from './conexiones.component';

describe('ConexionesComponent', () => {
  let component: ConexionesComponent;
  let fixture: ComponentFixture<ConexionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionApiComponent } from './gestion-api.component';

describe('GestionApiComponent', () => {
  let component: GestionApiComponent;
  let fixture: ComponentFixture<GestionApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

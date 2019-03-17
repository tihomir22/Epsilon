import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAComponent } from './grafico-a.component';

describe('GraficoAComponent', () => {
  let component: GraficoAComponent;
  let fixture: ComponentFixture<GraficoAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

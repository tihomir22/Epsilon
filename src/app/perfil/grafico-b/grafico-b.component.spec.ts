import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBComponent } from './grafico-b.component';

describe('GraficoBComponent', () => {
  let component: GraficoBComponent;
  let fixture: ComponentFixture<GraficoBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

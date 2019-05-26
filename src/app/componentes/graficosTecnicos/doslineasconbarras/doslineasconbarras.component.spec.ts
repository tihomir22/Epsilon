import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoslineasconbarrasComponent } from './doslineasconbarras.component';

describe('DoslineasconbarrasComponent', () => {
  let component: DoslineasconbarrasComponent;
  let fixture: ComponentFixture<DoslineasconbarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoslineasconbarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoslineasconbarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

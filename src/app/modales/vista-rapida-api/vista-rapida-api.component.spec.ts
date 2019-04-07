import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRapidaApiComponent } from './vista-rapida-api.component';

describe('VistaRapidaApiComponent', () => {
  let component: VistaRapidaApiComponent;
  let fixture: ComponentFixture<VistaRapidaApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaRapidaApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRapidaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarTransaccionBinanceComponent } from './realizar-transaccion-binance.component';

describe('RealizarTransaccionBinanceComponent', () => {
  let component: RealizarTransaccionBinanceComponent;
  let fixture: ComponentFixture<RealizarTransaccionBinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarTransaccionBinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarTransaccionBinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

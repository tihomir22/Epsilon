import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesApiComponent } from './balances-api.component';

describe('BalancesApiComponent', () => {
  let component: BalancesApiComponent;
  let fixture: ComponentFixture<BalancesApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancesApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

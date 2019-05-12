import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaModalComponent } from './carga-modal.component';

describe('CargaModalComponent', () => {
  let component: CargaModalComponent;
  let fixture: ComponentFixture<CargaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

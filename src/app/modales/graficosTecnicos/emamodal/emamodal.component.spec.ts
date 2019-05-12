import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EMAmodalComponent } from './emamodal.component';

describe('EMAmodalComponent', () => {
  let component: EMAmodalComponent;
  let fixture: ComponentFixture<EMAmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EMAmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EMAmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

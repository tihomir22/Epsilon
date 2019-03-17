import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoticiasComponent } from './modal-noticias.component';

describe('ModalNoticiasComponent', () => {
  let component: ModalNoticiasComponent;
  let fixture: ComponentFixture<ModalNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

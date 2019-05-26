import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAdminComponent } from './dialogo-admin.component';

describe('DialogoAdminComponent', () => {
  let component: DialogoAdminComponent;
  let fixture: ComponentFixture<DialogoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

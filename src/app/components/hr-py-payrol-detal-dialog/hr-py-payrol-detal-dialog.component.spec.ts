import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPyPayrolDetalDialogComponent } from './hr-py-payrol-detal-dialog.component';

describe('HrPyPayrolDetalDialogComponent', () => {
  let component: HrPyPayrolDetalDialogComponent;
  let fixture: ComponentFixture<HrPyPayrolDetalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPyPayrolDetalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPyPayrolDetalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

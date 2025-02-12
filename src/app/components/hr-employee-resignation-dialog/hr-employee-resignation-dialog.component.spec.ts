import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeResignationDialogComponent } from './hr-employee-resignation-dialog.component';

describe('HrEmployeeResignationDialogComponent', () => {
  let component: HrEmployeeResignationDialogComponent;
  let fixture: ComponentFixture<HrEmployeeResignationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmployeeResignationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeResignationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

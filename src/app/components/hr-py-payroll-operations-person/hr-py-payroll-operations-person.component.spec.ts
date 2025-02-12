import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPyPayrollOperationsPersonComponent } from './hr-py-payroll-operations-person.component';

describe('HrPyPayrollOperationsPersonComponent', () => {
  let component: HrPyPayrollOperationsPersonComponent;
  let fixture: ComponentFixture<HrPyPayrollOperationsPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPyPayrollOperationsPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPyPayrollOperationsPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

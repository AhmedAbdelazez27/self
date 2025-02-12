import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPyPayrollOperationsComponent } from './hr-py-payroll-operations.component';

describe('HrPyPayrollOperationsComponent', () => {
  let component: HrPyPayrollOperationsComponent;
  let fixture: ComponentFixture<HrPyPayrollOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPyPayrollOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPyPayrollOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

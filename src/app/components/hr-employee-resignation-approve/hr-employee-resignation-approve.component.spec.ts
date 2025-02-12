import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeResignationApproveComponent } from './hr-employee-resignation-approve.component';

describe('HrEmployeeResignationApproveComponent', () => {
  let component: HrEmployeeResignationApproveComponent;
  let fixture: ComponentFixture<HrEmployeeResignationApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmployeeResignationApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeResignationApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

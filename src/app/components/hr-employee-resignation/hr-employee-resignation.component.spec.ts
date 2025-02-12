import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmployeeResignationComponent } from './hr-employee-resignation.component';

describe('HrEmployeeResignationComponent', () => {
  let component: HrEmployeeResignationComponent;
  let fixture: ComponentFixture<HrEmployeeResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmployeeResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

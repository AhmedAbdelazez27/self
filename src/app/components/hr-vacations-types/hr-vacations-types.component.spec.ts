import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVacationsTypesComponent } from './hr-vacations-types.component';

describe('HrVacationsTypesComponent', () => {
  let component: HrVacationsTypesComponent;
  let fixture: ComponentFixture<HrVacationsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrVacationsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVacationsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

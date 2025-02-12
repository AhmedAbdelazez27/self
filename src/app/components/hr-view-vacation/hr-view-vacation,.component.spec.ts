import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewVacationComponent } from './hr-person-dialog.component';

describe('HrViewVacationComponent', () => {
  let component: HrViewVacationComponent;
  let fixture: ComponentFixture<HrViewVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrViewVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrViewVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

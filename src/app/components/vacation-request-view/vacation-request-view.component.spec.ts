import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestViewComponent } from './vacation-request-view.component';

describe('VacationRequestViewComponent', () => {
  let component: VacationRequestViewComponent;
  let fixture: ComponentFixture<VacationRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

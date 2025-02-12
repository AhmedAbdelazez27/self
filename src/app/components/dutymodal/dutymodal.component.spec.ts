import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutymodalComponent } from './dutymodal.component';

describe('DutymodalComponent', () => {
  let component: DutymodalComponent;
  let fixture: ComponentFixture<DutymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

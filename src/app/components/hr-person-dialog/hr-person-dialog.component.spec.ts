import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPersonDialogComponent } from './hr-person-dialog.component';

describe('HrPersonDialogComponent', () => {
  let component: HrPersonDialogComponent;
  let fixture: ComponentFixture<HrPersonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPersonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

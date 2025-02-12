import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportModalComponent } from './passport-modal.component';

describe('PassportModalComponent', () => {
  let component: PassportModalComponent;
  let fixture: ComponentFixture<PassportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

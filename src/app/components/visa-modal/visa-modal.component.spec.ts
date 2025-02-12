import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaModalComponent } from './visa-modal.component';

describe('VisaModalComponent', () => {
  let component: VisaModalComponent;
  let fixture: ComponentFixture<VisaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

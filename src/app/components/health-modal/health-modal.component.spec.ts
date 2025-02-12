import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthModalComponent } from './health-modal.component';

describe('HealthModalComponent', () => {
  let component: HealthModalComponent;
  let fixture: ComponentFixture<HealthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

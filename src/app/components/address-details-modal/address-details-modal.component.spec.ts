import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailsModalComponent } from './address-details-modal.component';

describe('AddressDetailsModalComponent', () => {
  let component: AddressDetailsModalComponent;
  let fixture: ComponentFixture<AddressDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

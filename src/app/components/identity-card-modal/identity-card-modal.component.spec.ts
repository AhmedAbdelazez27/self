import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityCardModalComponent } from './identity-card-modal.component';

describe('IdentityCardModalComponent', () => {
  let component: IdentityCardModalComponent;
  let fixture: ComponentFixture<IdentityCardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityCardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

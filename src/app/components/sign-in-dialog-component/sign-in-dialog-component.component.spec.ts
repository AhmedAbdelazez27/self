import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInDialogComponentComponent } from './sign-in-dialog-component.component';

describe('SignInDialogComponentComponent', () => {
  let component: SignInDialogComponentComponent;
  let fixture: ComponentFixture<SignInDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

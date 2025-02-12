import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestmodalValidationComponent } from './requestmodal-validation.component';

describe('RequestmodalValidationComponent', () => {
  let component: RequestmodalValidationComponent;
  let fixture: ComponentFixture<RequestmodalValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestmodalValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmodalValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

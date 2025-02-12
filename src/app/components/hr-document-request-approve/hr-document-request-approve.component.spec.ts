import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentRequestApproveComponent } from './hr-document-request-approve.component';

describe('HrDocumentRequestApproveComponent', () => {
  let component: HrDocumentRequestApproveComponent;
  let fixture: ComponentFixture<HrDocumentRequestApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDocumentRequestApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentRequestApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentRequestApproveDialogComponent } from './hr-document-request-approve-dialog.component';

describe('HrDocumentRequestApproveDialogComponent', () => {
  let component: HrDocumentRequestApproveDialogComponent;
  let fixture: ComponentFixture<HrDocumentRequestApproveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDocumentRequestApproveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentRequestApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

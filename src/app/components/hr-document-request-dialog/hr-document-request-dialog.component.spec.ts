import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentRequestDialogComponent } from './hr-document-request-dialog.component';

describe('HrDocumentRequestDialogComponent', () => {
  let component: HrDocumentRequestDialogComponent;
  let fixture: ComponentFixture<HrDocumentRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDocumentRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

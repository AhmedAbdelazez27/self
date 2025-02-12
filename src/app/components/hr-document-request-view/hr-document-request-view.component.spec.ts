import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentRequestViewComponent } from './hr-document-request-view.component';

describe('HrDocumentRequestViewComponent', () => {
  let component: HrDocumentRequestViewComponent;
  let fixture: ComponentFixture<HrDocumentRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDocumentRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

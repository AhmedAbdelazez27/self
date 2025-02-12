import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDocumentRequestComponent } from './hr-document-request.component';

describe('HrDocumentRequestComponent', () => {
  let component: HrDocumentRequestComponent;
  let fixture: ComponentFixture<HrDocumentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDocumentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDocumentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

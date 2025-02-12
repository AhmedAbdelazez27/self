import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequestViewComponent } from './document-request-view.component';

describe('DocumentRequestViewComponent', () => {
  let component: DocumentRequestViewComponent;
  let fixture: ComponentFixture<DocumentRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

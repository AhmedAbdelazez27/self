import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsmodalComponent } from './attachmentsmodal.component';

describe('AttachmentsmodalComponent', () => {
  let component: AttachmentsmodalComponent;
  let fixture: ComponentFixture<AttachmentsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

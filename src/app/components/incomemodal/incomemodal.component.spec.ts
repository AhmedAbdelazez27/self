import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomemodalComponent } from './incomemodal.component';

describe('IncomemodalComponent', () => {
  let component: IncomemodalComponent;
  let fixture: ComponentFixture<IncomemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

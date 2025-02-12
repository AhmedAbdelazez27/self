import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilymembersmodalComponent } from './familymembersmodal.component';

describe('FamilymembersmodalComponent', () => {
  let component: FamilymembersmodalComponent;
  let fixture: ComponentFixture<FamilymembersmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilymembersmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilymembersmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

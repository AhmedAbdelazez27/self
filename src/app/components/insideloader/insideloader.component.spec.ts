import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideloaderComponent } from './insideloader.component';

describe('InsideloaderComponent', () => {
  let component: InsideloaderComponent;
  let fixture: ComponentFixture<InsideloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

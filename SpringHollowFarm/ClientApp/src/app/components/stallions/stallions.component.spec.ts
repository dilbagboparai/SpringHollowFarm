import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StallionsComponent } from './stallions.component';

describe('StallionsComponent', () => {
  let component: StallionsComponent;
  let fixture: ComponentFixture<StallionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StallionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StallionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

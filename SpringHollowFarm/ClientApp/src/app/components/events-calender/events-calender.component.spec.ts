import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCalenderComponent } from './events-calender.component';

describe('EventsCalenderComponent', () => {
  let component: EventsCalenderComponent;
  let fixture: ComponentFixture<EventsCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyServicesComponent } from './buy-services.component';

describe('ServicesComponent', () => {
  let component: BuyServicesComponent;
  let fixture: ComponentFixture<BuyServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseForSaleComponent } from './horse-for-sale.component';

describe('HorseForSaleComponent', () => {
  let component: HorseForSaleComponent;
  let fixture: ComponentFixture<HorseForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { BuyServicesService} from "./buy-services.service";

describe('BuyServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyServicesService]
    });
  });

  it('should be created', inject([BuyServicesService], (service: BuyServicesService) => {
    expect(service).toBeTruthy();
  }));
});

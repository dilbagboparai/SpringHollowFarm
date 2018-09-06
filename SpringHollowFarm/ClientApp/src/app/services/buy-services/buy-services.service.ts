import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Order } from "../../models/order";

@Injectable()
export class BuyServicesService {

  baseUrl: string="";
  constructor(private client: HttpClient) { 
  }

  getServices():any {
    return this.client.get<any>("api/getAllServices");
  }; 
  paymentCompleted(model: Order): any {
    return this.client.post('api/paymentCompleted', model).pipe();
  }; 
}

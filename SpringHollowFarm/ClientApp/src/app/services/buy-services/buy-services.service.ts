import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable()
export class BuyServicesService {

  baseUrl: string="";
  constructor(private client: HttpClient) { 
  }

  getServices():any {
    return this.client.get<any>("api/getAllServices");
  }; 
  paymentCompleted(user: User): any {
    return this.client.post('api/paymentCompleted', user).pipe();
  }; 
}

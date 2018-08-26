import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Service } from "../../models/service";
import { Observable, of } from 'rxjs';

@Injectable()
export class BuyServicesService {

  baseUrl: string;
  constructor(private client: HttpClient) { 
  }

  getServices():any {
    return this.client.get<any>("api/getAllServices");
  }; 

}

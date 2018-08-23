import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class AccountService {

  baseUrl: string;
  constructor(private client: HttpClient, @Inject('BASE_URL') baseUrl: string) { 

    this.baseUrl=baseUrl;

  }

  contactUs(user:User){
    return this.client.post(this.baseUrl + 'api/contactus', user).pipe();
  }

}

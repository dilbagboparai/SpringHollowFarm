import {Service  } from './service'
export class Order{
  constructor() {
    this.products = [];
  }
  firstName:string
  lastName:string
  email:string
  phone :string
  products: Service[]
  totalAmount: number
  totalQuantity:number
}

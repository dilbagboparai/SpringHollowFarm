import { ComponentCanDeactivate } from '../can-deactivate/component-can-deactivate';
import { Order } from "../models/order";
export abstract class FormCanDeactivate extends ComponentCanDeactivate {

  abstract get cartOrder(): Order;

  canDeactivate(): boolean {
    return this.cartOrder.products.length == 0;
  }
}

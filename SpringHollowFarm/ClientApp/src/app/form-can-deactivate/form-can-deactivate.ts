import { ComponentCanDeactivate } from '../can-deactivate/component-can-deactivate';
import { CartAction } from "../store/actions/cart.actions";
export abstract class FormCanDeactivate extends ComponentCanDeactivate {

  abstract get CartAction(): CartAction;

  canDeactivate(): boolean {
    let products = [];
    this.CartAction.getState().subscribe(res => {
      products = res.products;
      return products.length > 0;
    })
    return products.length > 0;
   
  }
}

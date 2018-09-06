import { Component, AfterViewChecked, OnInit ,Directive} from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { BuyServicesService } from '../../services/buy-services/buy-services.service';
import { CartAction } from "../../store/actions/cart.actions";
import { Subscription } from 'rxjs/Subscription';
import { Service } from '../../models/service'
import { Order } from "../../models/order"
declare let paypal: any;
@
Component({
  selector: 'app-services',
  templateUrl: './buy-services.component.html',
  styleUrls: ['./buy-services.component.css']
})
 
export class BuyServicesComponent implements OnInit, AfterViewChecked {
  public services: Service[];
  quantity: number;
  public order: Order = new Order();
  public actions: any;
  public cartSubscription: Subscription;
  public orderForm:NgForm;
  submitted: boolean = false;
  paymentCompleted:boolean=false;
  constructor(private toast: ToastyService, private buyServices: BuyServicesService, private cartStore: CartAction) {
  }

  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.order.products = res.products
      this.getTotalPrice()
    })
    let element: HTMLElement = document.getElementsByClassName('tablinks')[0] as HTMLElement;
    element.click();
    this.getServices();
    this.getTotalPrice();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }

  openTab(evt: any, cityName: string): void {
    this.paymentCompleted = false;
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";   
      evt.currentTarget.className += " active";
  }
  //Get Service from api
  getServices() {
    this.buyServices.getServices().subscribe((res: any) => {
      this.services = res.data;
      console.log(this.services);
    });;
  }

  //On click of add to cart button
  onCartAdd(event, item: Service) {
    let index = this.getIndexById(item.id);
    if (index == -1) {
      let additionPrice = this.getAdditionPrice(item);
      item.totalPrice = item.price + additionPrice;
      this.cartStore.addToCart(item, this.quantity || 1)
      this.toast.success(item.name + " is added into your cart.");
      this.getTotalPrice();
    }
    else
      this.toast.warning(item.name+" is already added into your cart.");
  }

   //On click of remove to cart
  removeService(item: Service) {
    this.cartStore.removeFromCart(item)
    //this.getTotalPrice();
  }

  getIndexById(id) {
 return  this.order.products.findIndex(x => x.id == id);
  }
  getAdditionPrice(_item: Service) {
    let totalCost: Array<number> = [];
    let intPrice: number;
    _item.additionalFees.forEach((item, i) => {
      intPrice = item.value;
      totalCost.push(intPrice)

    });
    let totaladdition =totalCost.reduce((acc, item) => {
      return acc += item
    }, 0);
    return totaladdition;
  }
  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.order.products.forEach((item, i) => {
      intPrice = item.totalPrice
      intQuantity = 1
      totalCost.push(intPrice)
      quantity.push(intQuantity)
    })

    this.order.totalAmount = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.order.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
  }
  isValid() {
    if (!this.order.firstName || !this.order.lastName || !this.order.email || !this.order.phone) {
      return false;
    } else
      return true;
  }
 
  onchangeForm(_orderForm: NgForm) {
    this.orderForm = _orderForm;
    if (this.actions != null)
      this.toggleButton(this.actions);
  }

  getCartNotification() {
    return  this.order.products.length > 0 ? 'cart' : '';
  }

  toggleButton(actions:any) {
    this.isValid() ? actions.enable() : actions.disable();
  }

  toggleValidationMessage() {
    if (!this.order.firstName) {
      this.toast.error("Firstname cann't be empty.")
      return;
    }
    else if (!this.order.lastName) {
      this.toast.error("Lastname cann't be empty."); return;
    }
    else if (!this.order.email) {
      this.toast.error("Email cann't be empty."); return;
    }
    else if (!this.order.phone) {
      this.toast.error("Phone cann't be empty."); return;
    }
    this.toggleButton(this.actions);
  }
  
  onCheckOut() {
    this.buyServices.paymentCompleted(this.order).subscribe(
      data => {
        this.toast.success("Your payment is successfully completed.");
        this.order = new Order();
        this.submitted = false;
        this.paymentCompleted = true;
      },
      Error => {
        console.log(Error);
        this.toast.success("A error occured, Please try again");
      });
  };
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AfHaKddXZAVOLf7FZY7FkvYPaxgHfpUMja8zW4yMEUR0ym-XvwsacK0sUig4TWCku6QoqbN8tumoRgQP',
      production: '<your-production-key-here>'
    },
    commit: true,

    validate:(actions:any)=> {
      this.toggleButton(actions);
      this.actions = actions;
    },

    onClick: () => {
      this.submitted = true;
      //this.toggleValidationMessage();
    },

    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.order.totalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.buyServices.paymentCompleted(this.order).subscribe(
          data => {
            this.toast.success("Your payment is successfully completed.");
            this.submitted = false;
            this.paymentCompleted = true;
            this.order = new Order();
          },
          Error => {
            console.log(Error);
            this.submitted = false;
            this.toast.success("A error occured, Please try again");
          });
      });
      
    }

  };

  ngAfterViewChecked(): void {
    if (!this.addScript && this.order.products.length>0) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}

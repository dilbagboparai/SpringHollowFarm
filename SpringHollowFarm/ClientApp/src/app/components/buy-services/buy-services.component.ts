import { Component, AfterViewChecked, OnInit ,Directive} from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { BuyServicesService } from '../../services/buy-services/buy-services.service';
import { Service } from '../../models/service'
import { User } from '../../models/user';
declare let paypal: any;
@
Component({
  selector: 'app-services',
  templateUrl: './buy-services.component.html',
  styleUrls: ['./buy-services.component.css']
})
 
export class BuyServicesComponent implements OnInit, AfterViewChecked {
 public   services: Service[];
 public cartStore: Service[] = [];
  public totalPrice: number;
  public totalQuantity: number;
  public user: User = new User();
  public  actions:any;
  constructor(private toast: ToastyService, private buyServices:BuyServicesService) {
  }

  ngOnInit() {
    let element: HTMLElement = document.getElementsByClassName('tablinks')[0] as HTMLElement;
    element.click();
    this.getServices();
    this.getTotalPrice();
  }



  openTab(evt:any, cityName:string):void {
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
      this.cartStore.push(item);
      this.toast.success(item.name + " is added into your cart.");
      this.getTotalPrice();
    }
    else
      this.toast.warning(item.name+" is already added into your cart.");
  }

   //On click of remove to cart
  removeService(item: Service) {
    let index = this.getIndexById(item.id);
    this.cartStore.splice(index, 1);
    this.getTotalPrice();
  }

  getIndexById(id) {
 return  this.cartStore.findIndex(x => x.id == id);
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
    this.cartStore.forEach((item, i) => {
      intPrice = item.totalPrice
      intQuantity = 1
      totalCost.push(intPrice)
      quantity.push(intQuantity)
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
  }
  isValid() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.phone) {
      return false;
    } else
      return true;
  }
 
  onchangeForm() {
    if (this.actions != null)
      this.toggleButton(this.actions);
  }
  toggleButton(actions:any) {
    this.isValid() ? actions.enable() : actions.disable();
  }

  toggleValidationMessage() {
    if (!this.user.firstName) {
      this.toast.error("Firstname cann't be empty.")
      return;
    }
    else if (!this.user.lastName) {
      this.toast.error("Lastname cann't be empty."); return;
    }
    else if (!this.user.email) {
      this.toast.error("Email cann't be empty."); return;
    }
    else if (!this.user.phone) {
      this.toast.error("Phone cann't be empty."); return;
    }
    this.toggleButton(this.actions);
  }
  

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

    onClick:()=> {
      this.toggleValidationMessage();
    },

    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalPrice, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.buyServices.paymentCompleted(this.user).subscribe(
          data => {
            this.toast.success("Your payment is successfully completed.");
            console.log(payment);
            this.user.firstName = '';
            this.user.lastName = '';
            this.user.email = '';
            this.user.phone = '';
            this.user.message = '';
            this.cartStore = [];
          },
          Error => {
            console.log(Error);
            this.toast.success("A error occured, Please try again");
          });
      });
    }

  };

  ngAfterViewChecked(): void {
    if (!this.addScript && this.cartStore.length>0) {
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

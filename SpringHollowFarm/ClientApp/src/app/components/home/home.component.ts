import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user';
import { ToastyService } from 'ng2-toasty';
import { error } from 'protractor';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageObject: any;
  user: User = new User();
  constructor(
    private accountService: AccountService,
    private toast: ToastyService

  ) {

  }
  submitInfo() {
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
    else if (!this.user.message) {
      this.toast.error("Message cann't be empty."); return;
    }

    this.accountService.contactUs(this.user).subscribe(
      data =>
      {        
        console.log(data);        
        this.toast.success("Email Sent Sucessfully!");
        this.user.firstName = '';
        this.user.lastName = '';
        this.user.email = '';
        this.user.phone = '';
        this.user.message = ''; 
      },
      Error => {
        console.log(Error);
        this.toast.success("A error occured, Please try again");
      });
     
    
      
  }

  ngOnInit() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
          nav: true
        },
        600: {
          items: 3,
          nav: false
        },
        1000: {
          items: 4,
          nav: true,
          loop: false,
          margin: 5
        }
      }
    })
  }

}

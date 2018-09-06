import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  submitted: boolean = false;
  submitting:boolean = false;
  constructor(
    private accountService: AccountService,
    private toast: ToastyService

  ) {

  }
  submitInfo(contactUsForm: NgForm) {
    this.submitted = true;
    if (contactUsForm.valid) {
      this.submitting = true;
      this.accountService.contactUs(this.user).subscribe(
        data => {
          console.log(data);
          this.toast.success("Email Sent Sucessfully!");
          this.user.firstName = '';
          this.user.lastName = '';
          this.user.email = '';
          this.user.phone = '';
          this.user.message = '';
          this.submitting = false;
          this.submitted = false;
          contactUsForm.resetForm();
        },
        Error => {
          console.log(Error);
          this.submitting = false;
          this.submitted = false;
          contactUsForm.resetForm();
          this.toast.success("A error occured, Please try again");
        });
      
    } 
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

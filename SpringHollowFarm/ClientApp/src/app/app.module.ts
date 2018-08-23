import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { AccountService } from './services/account.service';
import { SharedModule } from './shared/shared.module';

import { StallionsComponent } from './components/stallions/stallions.component';
import { HorseForSaleComponent } from './components/horse-for-sale/horse-for-sale.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { ServicesComponent } from './components/services/services.component';
import { EventsCalenderComponent } from './components/events-calender/events-calender.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "stallions", component: StallionsComponent },
  { path: "horse-for-sale", component: HorseForSaleComponent },
  { path: "facilities", component: FacilitiesComponent },
  { path: "services", component: ServicesComponent },
  { path: "events-calender", component: EventsCalenderComponent },
  { path: "about-us", component: AboutUsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StallionsComponent,
    HorseForSaleComponent,
    FacilitiesComponent,
    ServicesComponent,
    EventsCalenderComponent,
    AboutUsComponent,
    CounterComponent    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

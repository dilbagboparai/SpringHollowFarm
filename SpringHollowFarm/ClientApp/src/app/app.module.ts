import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ACTIONS } from './store/actions';
import { reducers, metaReducers } from './store/reducers';
import { AllEffects } from './store/effects';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { AccountService } from './services/account.service';
import { BuyServicesService } from "./services/buy-services/buy-services.service";
import { SharedModule } from './shared/shared.module';

import { StallionsComponent } from './components/stallions/stallions.component';
import { HorseForSaleComponent } from './components/horse-for-sale/horse-for-sale.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { ServicesComponent } from './components/services/services.component';
import { EventsCalenderComponent } from './components/events-calender/events-calender.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BuyServicesComponent } from "./components/buy-services/buy-services.component"
import { CanDeactivateGuard } from "./can-deactivate/can-deactivate-guard";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "stallions", component: StallionsComponent },
  { path: "horse-for-sale", component: HorseForSaleComponent },
  { path: "facilities", component: FacilitiesComponent },
  { path: "services", component: ServicesComponent },
  { path: "events-calender", component: EventsCalenderComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "buy-services", component: BuyServicesComponent, canDeactivate:[CanDeactivateGuard] }
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
    CounterComponent,
    BuyServicesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.forRoot(reducers,
       { metaReducers }
    )
  ],
  exports: [],
  providers: [AccountService, BuyServicesService,CanDeactivateGuard,ACTIONS],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[FormsModule,ToastyModule,HeaderComponent,FooterComponent],
  declarations: [HeaderComponent, FooterComponent]
})
export class SharedModule { }

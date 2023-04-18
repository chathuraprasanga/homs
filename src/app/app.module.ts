import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsComponent } from './components/product/products/products.component';
import { HardwaresComponent } from './components/hardware/hardwares/hardwares.component';
import { OrdersComponent } from './components/order/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from "@angular/common/http";
import { HardwareAddEditComponent } from './components/hardware/hardware-add-edit/hardware-add-edit.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OrderAddEditComponent } from './components/order/order-add-edit/order-add-edit.component';
import { ProductAddEditComponent } from './components/product/product-add-edit/product-add-edit.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatButtonModule} from "@angular/material/button";
import { UserAddEditComponent } from './components/user/user-add-edit/user-add-edit.component';
import { UsersComponent } from './components/user/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    ProductsComponent,
    HardwaresComponent,
    OrdersComponent,
    DashboardComponent,
    HardwareAddEditComponent,
    OrderAddEditComponent,
    ProductAddEditComponent,
    UserAddEditComponent,

    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCardModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./components/admin-layout/admin-layout.component";
import {LoginComponent} from "./components/login/login.component";
import {ProductsComponent} from "./components/product/products/products.component";
import {HardwaresComponent} from "./components/hardware/hardwares/hardwares.component";
import {OrdersComponent} from "./components/order/orders/orders.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HardwareService} from "./services/hardware/hardware.service";
import {HardwareAddEditComponent} from "./components/hardware/hardware-add-edit/hardware-add-edit.component";
import {HardwareAddEditService} from "./services/hardware/hardware-add-edit.service";
import {OrderAddEditComponent} from "./components/order/order-add-edit/order-add-edit.component";
import {OrderAddEditService} from "./services/order/order-add-edit.service";
import {OrderService} from "./services/order/order.service";
import {ProductService} from "./services/product/product.service";
import {ProductAddEditComponent} from "./components/product/product-add-edit/product-add-edit.component";
import {ProductAddEditService} from "./services/product/product-add-edit.service";
import {DashboardService} from "./services/dashboard/dashboard.service";
import {UsersComponent} from "./components/user/users/users.component";
import {UserService} from "./services/user/user.service";
import {UserAddEditComponent} from "./components/user/user-add-edit/user-add-edit.component";
import {UserAddEditService} from "./services/user/user-add-edit.service";


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: "full"
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children: [
      {
        path:'products',
        component: ProductsComponent,
        resolve:{
          data: ProductService
        }
      },{
        path:'products/add-edit',
        component: ProductAddEditComponent,
        resolve:{
          data: ProductAddEditService
        }
      },
      {
        path:'hardwares',
        component:HardwaresComponent,
        resolve:{
          data: HardwareService}
      },{
        path:'hardwares/add-edit',
        component:HardwareAddEditComponent,
        resolve:{
          data:HardwareAddEditService
        }
      },
      {
        path:'orders',
        component:OrdersComponent,
        resolve:{
          data:OrderService
        }
      },
      {
        path:'orders/add-edit',
        component:OrderAddEditComponent,
        resolve:{
          data:OrderAddEditService
        }
      },
      {
        path:'dashboard',
        component:DashboardComponent,
        resolve:{
          data:DashboardService
        }
      },
      {
        path:'users',
        component: UsersComponent,
        resolve:{
          data:UserService
        }
      },
      {
        path:'users/add-edit',
        component: UserAddEditComponent,
        resolve:{
          data:UserAddEditService
        }
      },
      {
        path:'**',
        redirectTo:'dashboard',
        pathMatch: "full"
      },
    ]
  },
  {
    path:'**',
    redirectTo:'login',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

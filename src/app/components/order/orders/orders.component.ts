import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../services/order/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {



  orders: any = [];

  products: any = [];

  orderID : any;

  orderSearchForm: FormGroup;

  showFilter:boolean = false;

  constructor(private orderService : OrderService,
              private router :Router,
              private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    this.orderService.onOrdersChange.subscribe((orders) =>{
      // console.log("hardwares",hardwares);
      if (orders){
        this.orders = orders;
      }
    });

    // i commented that because product details take with order
    this.orderService.onProductsChanged.subscribe((products)=>{
      this.products = products;
    });

    this.orderSearchForm = this.formBuilder.group({
      hardwareName:[''],
      productID: ['']
    });

  }

  //get hardware btn
  // getHardwares() {
  //   this.hardwareService.getHardwares();
  // }

  addEditOrder(order){
    // console.log("hardware",hardware);

    if (order!=null) {
      sessionStorage.setItem("orderID",order.orderID);
    }else {
      sessionStorage.removeItem("orderID");
    }



    this.router.navigate(['/admin/orders/add-edit'])

  }

  deleteOrder(orderID){
    // console.log(orderID);
    if (confirm("Are you sure to delete record?"))
    this.orderService.deleteOrder(orderID);



  }


  onSearch(){
    let data = this.orderSearchForm.getRawValue();

    this.orderService.getOrders(data);
    // console.log(data)
  }

  onClear(){
    this.orderSearchForm.setValue({
      hardwareName:'',
      productID:''

    });

    this.onSearch();

  }

  showHideFilter(){
    this.showFilter = !this.showFilter
  }

}

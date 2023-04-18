import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  onOrdersChange = new Subject();
  onProductsChanged = new Subject();

  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getOrders({});
    this.getAllProducts();                         //this works with jdbc no need separately
    // console.log("This is resolve")
  }

  getOrders(orderSearchRQ){
    //JPA Method
    // this.httpClient.get('http://localhost:8082/api/v1/order/get-all-order')
    //   .subscribe((orders) => {
    //     if (orders){
    //       this.onOrdersChange.next(orders)
    //       // console.log("hardwares",hardwares)
    //     }
    //
    //   })

    //JDBC Method
    this.httpClient.post('http://localhost:8082/api/v1/order/get-all-order-jdbc', orderSearchRQ)
      .subscribe((orders) => {
        if (orders){
          this.onOrdersChange.next(orders);
          // console.log("orders",orders)
        }

      })

  }

  deleteOrder(orderID){
    // console.log(orderID);
    this.httpClient.delete("http://localhost:8082/api/v1/order/delete-order"+"/"+orderID)
      .subscribe((result) => {
        // console.log("result", result)
        alert("Order Deleted")
          location.reload();
      });
    // alert("Something went wrong, Try again later")

  }


  // searchOrder(orderSearchRQ){
  //   this.httpClient.post('http://localhost:8082/api/v1/order/get-all-order-jdbc',orderSearchRQ)
  //     .subscribe((orders) =>{
  //       this.onOrdersChange.next(orders)
  //     })
  // }

  getAllProducts(){
    this.httpClient.get(`http://localhost:8082/api/v1/product/get-all-product`)
      .subscribe((products)=>{
        // console.log("products",products)
        this.onProductsChanged.next(products)
      })

  }


}

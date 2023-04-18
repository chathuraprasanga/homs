import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderAddEditService implements Resolve<any>{


  order = new BehaviorSubject({});
  onProductsChanged = new Subject();
  onHardwaresChanged = new Subject();
  productPrice = new Subject();



  constructor(private httpClient :HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getOrderByID();
    this.getAllProducts();
    this.getAllHardwares();
  }

  getOrderByID(){
    // console.log("call getHardwareByID")

    let orderID = sessionStorage.getItem("orderID");
    // console.log(hardwareID)

    if (orderID!= null){
      this.httpClient.get(`http://localhost:8082/api/v1/order/search-order/${orderID}`)
        .subscribe((order) => {
          // console.log(hardware)
          this.order.next(order);
        })
    }else {
      // console.log("Hardware ID null")
      this.order.next({})
    }

  }

  //get all active products
  getAllProducts(){
    this.httpClient.get(`http://localhost:8082/api/v1/product/get-all-active-product`)
      .subscribe((products)=>{
        // console.log("products",products)
        this.onProductsChanged.next(products)
      })
  }


  // should develop method to get all active hardwares
  getAllHardwares(){
    this.httpClient.get(`http://localhost:8082/api/v1/hardware/get-all-active-hardware`)
      .subscribe((hardwares)=>{
        // console.log("hardwares",hardwares)
        this.onHardwaresChanged.next(hardwares)
      })
  }

  saveOrder(order : any){
    this.httpClient.post('http://localhost:8082/api/v1/order/save-and-update-order', order)
      .subscribe((order) =>{
        this.order.next(order);
      })
  }

  getProductPriceByID(productID){
    // console.log(productID);
    this.httpClient.get(`http://localhost:8082/api/v1/product/get-product-price-by-ID/${productID}`)
      .subscribe((productPrice) => {
        // console.log(productPrice)
        this.productPrice.next(productPrice);
      })
  }

}


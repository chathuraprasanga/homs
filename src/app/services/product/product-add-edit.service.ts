import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductAddEditService implements Resolve<any>{


  product = new BehaviorSubject({});


  constructor(
    private httpClient :HttpClient,

  ) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getProductByID();
  }

  getProductByID(){
    // console.log("call getHardwareByID")

    let productID = sessionStorage.getItem("productID");
    // console.log(hardwareID)

    if (productID!= null){
      this.httpClient.get(`http://localhost:8082/api/v1/product/search-product/${productID}`)
        .subscribe((product) => {
          // console.log(hardware)
          this.product.next(product);
        })
    }else {
      // console.log("Hardware ID null")
      this.product.next({})
    }

  }

  saveProduct(product : any){
    this.httpClient.post('http://localhost:8082/api/v1/product/save-and-update-product', product)
      .subscribe((product) =>{
        console.log(product);
        this.product.next(product);
      });
  }


  getProductPriceByID(){



  }




}

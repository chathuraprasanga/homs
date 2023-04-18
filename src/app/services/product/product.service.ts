import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<any>{

  onProductsChange = new Subject();


  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getProducts({});
    // console.log("This is resolve")
  }

  getProducts(productSearchRQ){
    //Jpa Method
    // this.httpClient.get('http://localhost:8082/api/v1/product/get-all-product')
    //   .subscribe((products) => {
    //     if (products){
    //       this.onProductsChange.next(products)
    //       // console.log("hardwares",hardwares)
    //     }
    //
    //   });

    //jdbc method
    this.httpClient.post('http://localhost:8082/api/v1/product/get-all-product-jdbc', productSearchRQ)
      .subscribe((products) => {
        if (products){
          this.onProductsChange.next(products);
          // console.log("products",products)
        }

      });
  }

  deleteProduct(productID){
    console.log(productID);
    this.httpClient.delete("http://localhost:8082/api/v1/product/delete-product"+"/"+productID)
      .subscribe((result) => {
          // console.log("result", result);
        alert("Product Deleted");
          location.reload();
      });

  }


//  Error Handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }


}

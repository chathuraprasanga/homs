import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<any>{

  onUsersChange = new Subject();


  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getUsers({});
    // console.log("This is resolve")
  }

  getUsers(userSearchRQ){
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
    this.httpClient.post('http://localhost:8082/api/v1/user/get-all-users-jdbc', userSearchRQ)

      .subscribe((users) => {
        if (users){
          this.onUsersChange.next(users);
          // console.log("products",users)
        }

      });
  }

  deleteUser(userID){
    console.log(userID);
    this.httpClient.delete("http://localhost:8082/api/v1/user/delete-user"+"/"+userID)
      .subscribe((result) => {
        // console.log("result", result);
        alert("User Deleted");
        location.reload();
      });

  }





}

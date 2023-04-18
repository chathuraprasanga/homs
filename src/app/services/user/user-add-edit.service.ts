import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAddEditService implements Resolve<any>{


  user = new BehaviorSubject({});


  constructor(private httpClient :HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getUserByID();
  }

  getUserByID(){
    // console.log("call getHardwareByID");

    let userID = sessionStorage.getItem("userID");
    // console.log(hardwareID)

    if (userID!= null){
      this.httpClient.get(`http://localhost:8082/api/v1/user/get-user-by-id/${userID}`)
        .subscribe((user) => {
          // console.log(hardware)
          this.user.next(user);
        })
    }else {
      // console.log("Hardware ID null")
      this.user.next({})
    }

  }

  saveUser(user : any){
    this.httpClient.post('http://localhost:8082/api/v1/user/save-and-update-user', user)
      .subscribe((user) =>{
        console.log(user);
        this.user.next(user);
      });
  }
}

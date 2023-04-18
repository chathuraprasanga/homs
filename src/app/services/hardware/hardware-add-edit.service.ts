import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HardwareAddEditService implements Resolve<any>{


  hardware = new BehaviorSubject({});


  constructor(private httpClient :HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getHardwareByID();
  }

  getHardwareByID(){
    // console.log("call getHardwareByID")

    let hardwareID = sessionStorage.getItem("hardwareID");
    // console.log(hardwareID)

    if (hardwareID!= null){
      this.httpClient.get(`http://localhost:8082/api/v1/hardware/search-hardware/${hardwareID}`)
        .subscribe((hardware) => {
          // console.log(hardware)
          this.hardware.next(hardware);
        })
    }else {
      // console.log("Hardware ID null")
      this.hardware.next({})
    }

  }

  saveHardware(hardware : any){
    this.httpClient.post('http://localhost:8082/api/v1/hardware/save-and-update-hardware', hardware)
      .subscribe((hardware) =>{
        // console.log(hardware);
        this.hardware.next(hardware);
      });
  }

}

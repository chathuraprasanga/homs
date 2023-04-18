import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {Resolve} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class HardwareService implements Resolve<any>{

  onHardwaresChange = new Subject();

  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getHardwares({});
    // console.log("This is resolve")
  }

  getHardwares(hardwareSearchRQ){
    //jpa method
    // this.httpClient.get('http://localhost:8082/api/v1/hardware/get-all-hardware')
    //   .subscribe((hardwares) => {
    //     if (hardwares){
    //       this.onHardwaresChange.next(hardwares)
    //       // console.log("hardwares",hardwares)
    //     }
    //
    //   });

    //jdbc method
    this.httpClient.post('http://localhost:8082/api/v1/hardware/get-all-hardware-jdbc', hardwareSearchRQ)
      .subscribe((hardwares) => {
        if (hardwares){
          this.onHardwaresChange.next(hardwares);
          // console.log("hardwares",hardwares)

        }

      });
  }

  deletehardware(hardwareID){
    // console.log(orderID);
    this.httpClient.delete("http://localhost:8082/api/v1/hardware/delete-hardware"+"/"+hardwareID)
      .subscribe((result) => {
        // console.log("result", result)

          alert("Hardware Deleted");
          location.reload();

      });
  }

  handleError(err){
    return throwError(err);
  }

}

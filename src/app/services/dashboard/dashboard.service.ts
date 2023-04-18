import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardValues = new Subject();

  constructor(
      private httpClient: HttpClient
  ) { }

  resolve(): Observable<any>| Promise<any> | any{
    this.getValues();
  }


  getValues(){
    //JDBC Method
    this.httpClient.get(`http://localhost:8082/api/v1/dashboard/get-all-value-jdbc`)
      .subscribe((values) => {

        if (values){
          this.dashboardValues.next(values);
          // console.log("values",values)
        }

      })

  }




}

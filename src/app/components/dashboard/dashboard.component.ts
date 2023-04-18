import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DashboardService} from "../../services/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  dashboardValues : any;


  constructor(private dashboardService : DashboardService,
              private router :Router,
  ){}

  ngOnInit(): void {
    // this.dashboardService.getValues();
    this.dashboardService.dashboardValues

      .subscribe((values) =>{
        // console.log("values in dashboard",values);
        if (values){
          this.dashboardValues = values;
        }
      })

  }

  getValues(){
    this.dashboardService.getValues();
  }


}

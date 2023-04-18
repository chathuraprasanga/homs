import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{

  userDetails: any = {};
  userRole: string;

  constructor(
    private router : Router
  ){}

  ngOnInit(){
    let user = sessionStorage.getItem('userDetails');
      // console.log("string",user)    // converted String file

    if (user != null){
      // console.log('user', JSON.parse(user)) //converted object from string
      this.userDetails = JSON.parse(user);
      if (this.userDetails.userRole == "ADMIN"){
        this.userRole = 'admin';
      }
    }else{
      alert("Please Login Again");
      this.router.navigate(['/login'])
    }





  }

  logout(){

    this.router.navigate(['/login']);
    sessionStorage.removeItem('userDetails')

  }

}

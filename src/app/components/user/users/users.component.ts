import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: any = [];

  userSearchForm : any =[];

  showFilter:boolean = false;

  constructor(private userService : UserService,
              private router :Router,
              private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    this.userService.onUsersChange.subscribe((users) =>{
      // console.log("hardwares",hardwares);
      this.users = users;
    });

    this.userSearchForm = this.formBuilder.group({
      userName:[''],
      userRole:[''],
      userStatus:['']
    });
  }

  //get hardware btn
  // getHardwares() {
  //   this.hardwareService.getHardwares();
  // }

  addEditUser(user:any){
    // console.log("hardware",hardware);

    if (user!=null) {
      sessionStorage.setItem("userID",user.userID);
    }else {
      sessionStorage.removeItem("userID");
    }



    this.router.navigate(['/admin/users/add-edit'])

  }

  deleteuser(userID){
    if (confirm("Are you sure to delete record?"))
    // console.log(productID);
      this.userService.deleteUser(userID);

  }

  onSearch(){
    let data = this.userSearchForm.getRawValue();

    this.userService.getUsers(data);
    // console.log(data)
  }

  onClear(){
    this.userSearchForm.setValue({
      userName:'',
      userRole:'',
      userStatus:''

    });

    this.onSearch();

  }

  showHideFilter(){
    this.showFilter = !this.showFilter
  }

}


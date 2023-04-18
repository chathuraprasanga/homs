import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../dto/user";
import {UserAddEditService} from "../../../services/user/user-add-edit.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit{

  userForm : FormGroup;
  user = new UserDTO();
  pageType: string;

  onUserChangeSub = new Subscription();

  constructor(
    private formBuilder : FormBuilder,
    private userAddEditService : UserAddEditService,
    private location :Location
  ){}

  ngOnInit(): void {
    this.onUserChangeSub = this.userAddEditService.user
      .subscribe((user) => {
        if (!_.isEmpty(user)){
          // console.log(product);
          this.user = new UserDTO(user);
          this.pageType ='edit';
        }else {
          this.user = new UserDTO();
          this.pageType = 'new';
        }
        // console.log("hardware" , this.hardware)
        this.userForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onUserChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      userID: [this.user.userID],
      userName: [this.user.userName,[Validators.required]],
      userPassword : [this.user.userPassword,[Validators.required]],
      userRole : [this.user.userRole,[Validators.required]],
      userStatus : [this.user.userStatus,[Validators.required]],

    })
  }

  isValid(){
    return this.userForm.valid;
  }

  isDirty(){
    return this.userForm.dirty;
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }

  saveUser(){
    let user = this.userForm.getRawValue();
    console.log("get data", user);
    this.userAddEditService.saveUser(user);
    if (user){
      // console.log(product);
      alert("Data Saved");
      this.location.back()
    }
  }

}

import { Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Route, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(private authService: AuthService,
              private router : Router,
              private formBuilder : FormBuilder){

  }

  ngOnInit(): void{
    this.authService.loginStatus.subscribe((userDetails) => {
      if (userDetails){
        this.router.navigate(['/admin/dashboard']);
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails)) //stringify is used for convert json to string value
      } else if (userDetails == null) {
        alert("Authentication Fail")
        // console.log("Authentication Error")
      }
    });

    this.loginForm = this.formBuilder.group({
      userName : ['',Validators.required],
      passWord : ['',Validators.required]
    })

  }

  onLogin(){
    let data = this.loginForm.getRawValue();

    // console.log("click")
    this.authService.login(data);


    // console.log("data",data);

    // if (data.username == 'admin' && data.password =='admin'){
    //   this.authService.login(true);
    // } else {
    //   this.authService.login(false);
    // }

    
  }

  //login btn validator only activate when user fill the username and password both
  isValid(){

    return this.loginForm.valid;

  }

  logout(){

  }

}

import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  class:any = "";
  flag:Boolean | undefined;
  ngOnInit() {
  }

  registerForm= new FormGroup({
    name: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password:new FormControl("", Validators.required),
    address:new FormControl("", Validators.required),
    phone:new FormControl("", Validators.required),
  });

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  signup() {
    this.class = "right-panel-active";
    console.log("hi")
  }

  sigin() {
    this.class = "";
  }

  constructor(private api: ApiService , private router: Router){
    const name = localStorage.getItem('user')
    console.log(name);
  }

  newUserSubmit(){
    if(this.registerForm.valid){
      if(this.api.userRegister(this.registerForm.value)){
        this.flag=false;
      } 
      else {
        this.flag=true;
      }
    } 
    else {
      this.flag=false;
    }
  }

  login(){
    if(this.loginForm.valid){
      if(this.api.userLogin(this.loginForm.value)){
        if(this.api.checkUserLogState() !== null){
          this.router.navigateByUrl('/');
          this.flag = false;
        }
      } else {
      this.flag=true;
      }
    }
  }

}

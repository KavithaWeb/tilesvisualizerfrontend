import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bookstore';
  logState: boolean;
  user:any;
  
  constructor(private api: ApiService ,private router: Router){
    this.user = JSON.parse(this.api.checkUserLogState());
    console.log(this.user)
    if(this.user == null || this.user == undefined){
      this.logState = false;
    } else {
      this.logState = true;
    }
  }

  logout(){
    this.api.logout();
    this.logState=false;
  }

  shopcart(){
    if(this.api.checkUserLogState() == null){
      alert("please login.")
    }else {
      this.router.navigateByUrl('/shop-cart/'+this.user[0].id);
    }
  }
}

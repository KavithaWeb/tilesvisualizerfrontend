import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  res:boolean=false;
  constructor(private http: HttpClient) { }
  endpoint:string = 'http://localhost:8080/api/';

  loggedIn:boolean = false;
  local:any;
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  addUserLocally(user:any){
    const userLocally = [user];
    localStorage.setItem('user', JSON.stringify(userLocally));
  }

  checkUserLogState(): any{

    try {
      return localStorage.getItem('user')
    } catch(e){
      return false;
    }
    
  }

  getallBooks(){
    return this.http.get(this.endpoint+"books");
  }

  getBookDetails(id: any){
    return this.http.get(this.endpoint+"books/get/"+id);
  }

  addBook(data:any){
    return this.http.post(this.endpoint+"books/create", JSON.stringify(data));
  }

  userRegister(data:any){
    this.http.post(this.endpoint+"user/register", JSON.stringify(data),this._options).subscribe((response:any)=>{
        this.res = true;
        this.loggedIn = true;
        this.addUserLocally(response);
      });
    return this.res;
  }

  userLogin(user:any) {
    this.http.post(this.endpoint + 'user/login', JSON.stringify(user), this._options).subscribe((response:any)=>{
      this.res = true;
      this.loggedIn = true;
      this.addUserLocally(response);
    });
    return this.res;
  }

  getUserShopdetails(id:any){
    return this.http.get(this.endpoint+"user/get/shop-cart-items/"+id);
  }

  addItemToShopcart(data:any){
    console.log(data);
    return this.http.post(this.endpoint+"user/addshopcart", JSON.stringify(data), this._options)
  }

  delShopcarItem(data:any){
    return this.http.post(this.endpoint+"user/shop/delete", JSON.stringify(data), this._options)
  }

  logout(){
    localStorage.clear();
    this.loggedIn=false;
    this.res = false;
  }

  sendComment(comment:any, id:any) {
    this.local = JSON.parse(this.checkUserLogState());
    const com = {
      id: id,
      name: this.local[0].name,
      comment: comment
    }
    console.log(com);
    this.http.post(this.endpoint+'books/comments', JSON.stringify(com), this._options).subscribe();
  }

  placeOrder(order:any) {
    return this.http.post(this.endpoint+"user/orders/create", JSON.stringify(order), this._options)
  }

  setOutOfStock(book_list:any) {
    book_list.forEach((book:String)=>{
      this.http.get(this.endpoint+"books/add-to/out-of-stock/"+book).subscribe((res:any)=>{console.log(res);});
    });

  }

  getOrderHistory(id:any) {
    return this.http.get(this.endpoint+"user/order-history/id/"+id);
  }

}

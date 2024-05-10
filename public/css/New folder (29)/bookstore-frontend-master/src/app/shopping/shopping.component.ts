import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  price:any;
  res:any;
  favoriteSeason:any;
  shoppingForm!:FormGroup;
  item:any;


  constructor(private formBuilder: FormBuilder,private router: ActivatedRoute, private api: ApiService, private route: Router) {
    this.price = router.snapshot.paramMap.get('price');
    this.res = JSON.parse(this.api.checkUserLogState())[0];
    console.log(this.res);
  }

  ngOnInit() {
    this.api.getUserShopdetails(this.res.id).subscribe((data) => {this.item=data})
    this.shoppingForm = this.formBuilder.group({
      address: ['', Validators.required],
      payment: ['', Validators.required],
      phone: ['', Validators.required],
      payment_ID: ['', Validators.required],
      total: ["₹"+this.price],
    });
  }

  submitShoppingForm() {
    if(this.shoppingForm.valid){
      console.log(this.shoppingForm.value);
      let data = this.shoppingForm.value;
      data['id'] = this.res.id;
      data['product'] = this.item;
      if(data.payment == 'Cash on Delivery') data['payment_ID'] = "Cash on Delivery";
      this.api.placeOrder(data).subscribe(()=>{

        const bookTitles = this.item.map((data:any) => data.product);
        console.log(bookTitles);
        this.api.setOutOfStock(bookTitles);
        this.route.navigate(['/']);
      });
    }
  }
}

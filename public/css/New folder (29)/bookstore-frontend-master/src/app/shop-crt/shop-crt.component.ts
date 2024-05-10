import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-shop-crt',
  templateUrl: './shop-crt.component.html',
  styleUrls: ['./shop-crt.component.css'],
})
export class ShopCrtComponent {
  data: any | undefined;
  id: any;
  totalPrice = 0;
  ngOnInit() {
    this.totalPrice = 0;
    this.id = this.router.snapshot.paramMap.get('id');
    this.api.getUserShopdetails(this.id).subscribe((item) => {
      this.data = item;
    });
  }

  constructor(private api: ApiService, private router: ActivatedRoute) {}

  calculateTotals(rate: number) {
    this.totalPrice += rate;
    return ' ';
  }

  delete(index: number) {
    const item = {
      id: this.id,
      index: index,
    };
    this.api.delShopcarItem(item).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    window.location.reload();
  }
}

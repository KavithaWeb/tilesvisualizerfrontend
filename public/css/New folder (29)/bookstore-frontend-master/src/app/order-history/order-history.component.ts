import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
  history: any;
  userId = JSON.parse(this.api.checkUserLogState());

  constructor(private api: ApiService) {
    api.getOrderHistory(this.userId[0].id).subscribe((response) => {
      this.history = response;
      console.log(this.history);
    });
  }
}

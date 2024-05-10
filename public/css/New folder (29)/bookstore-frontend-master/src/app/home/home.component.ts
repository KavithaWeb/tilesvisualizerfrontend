import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any;

  constructor(private api: ApiService) {
    this.api.getallBooks().subscribe(books =>this.data=books);
  }
}

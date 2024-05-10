import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() id: any | string;
  @Input() comments: any;
  comment = new FormControl('', Validators.required);

  constructor(private api:ApiService) {}

  submit(){
    if(this.comment.valid){
      this.api.sendComment(this.comment.value, this.id);
      console.log(this.comment.value);
      window.location.reload();
    }
  }

}

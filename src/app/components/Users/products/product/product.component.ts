import { Component, OnInit } from '@angular/core';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any
  Numberproduct:any
  constructor(private cs63: Cs63Service) { }

  ngOnInit(): void {
    this.feeddata()
  }

  feeddata() {
    this.cs63.getProductInclude().subscribe(data => {
      data.map(item => item.image = this.cs63.getProductImageUrl(item.image))
      this.product = data
      this.Numberproduct = this.product.length
    },
      error => {
        alert(JSON.stringify(error.error.message))
      },
      () => {
        console.log('complete')
      }
    )
  }
}

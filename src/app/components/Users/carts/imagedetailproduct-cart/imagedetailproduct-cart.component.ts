import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imagedetailproduct-cart',
  templateUrl: './imagedetailproduct-cart.component.html',
  styleUrls: ['./imagedetailproduct-cart.component.css']
})
export class ImagedetailproductCartComponent implements OnInit {
  numberCheck!:any
  images:any
  backendUrl = environment.backendUrl;
  constructor(private activatedroute:ActivatedRoute,private cs63:Cs63Service) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(async params=>{
      let id = params.id
      this.images = await this.cs63.getDetailProductByid(id).toPromise()
      this.numberCheck = this.images.length
      console.log(this.images)
    })
  }

}

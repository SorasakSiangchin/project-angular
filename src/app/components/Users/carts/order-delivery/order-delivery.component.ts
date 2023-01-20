import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit {
  
  idOrder: any
  DataDeliverry: any
  constructor(private location: Location, private activatedroute: ActivatedRoute, private cs63: Cs63Service, private http: HttpClient) {
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.idOrder = id
      this.feeddata(this.idOrder)
    })
  }

  ngOnInit(): void {
  }

  feeddata(id: string) {
    this.http.get<any>(`${this.cs63.DeliveryX2Url}/${id}`).subscribe(data => {
      this.DataDeliverry = data
    })
  }

  cancel() {
    this.location.back();
  }
}

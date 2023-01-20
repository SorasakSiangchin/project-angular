import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Orders } from '../../../../Models/Orders&Lists';
import { Location } from '@angular/common';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  //-- เก็บไอดี Order  --
  OrderID!: string

  //-- เก็บข้อมูล Order --
  DataOrder!: Orders
  
  status = false;

  constructor(private http: HttpClient, private activatedroute: ActivatedRoute, private location: Location ,private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async (params) => {
      let id = params.id
      this.OrderID = id 
      await this.http.get<any>(`${this.cs63.OrderX2Url}/${this.OrderID}`).subscribe((data) => {
        this.DataOrder = data
        console.log(this.DataOrder)
      })
    })
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back()
  }

  
}

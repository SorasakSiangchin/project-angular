import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { Orders } from '../../../../Models/Orders&Lists';
import { User } from '../../../../Models/๊Users';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  status = false
  IdUser!: number
  DataOrder!: Orders
  DataUser!: User
  constructor(private activatedroute: ActivatedRoute, private http: HttpClient, private location: Location ,private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(params => {
      let id = params.id
      this.http.get<any>(`${this.cs63.OrderX2Url}/${id}`).subscribe(data => {
        this.DataOrder = data
        this.IdUser = this.DataOrder.idUser
        console.log(JSON.stringify(this.DataOrder))
        this.feedDataUser()
      },
      error => {
        alert(JSON.stringify(error.error.message))
      },
      () => {
        console.log('complete')
      })
    })

  }

  ngOnInit(): void {

  }

  Bakc() {
    this.location.back();
  }

  feedDataUser() {
    this.http.get<any>(`${this.cs63.authenApiUrl}/${this.IdUser}`).subscribe(data => {
      this.DataUser = data
    },
    error => {
      alert(JSON.stringify(error.error.message))
    },
    () => {
      console.log('complete')
    })
  }

}

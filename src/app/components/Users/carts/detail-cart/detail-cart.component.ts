import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent implements OnInit {
  numberCheck!:number
  DetailCart: any
  backendUrl = environment.backendUrl;
  constructor(private activatedRoute: ActivatedRoute, private cs63: Cs63Service, private location: Location,private http:HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      this.http.get<any>(`${this.cs63.productUrl}/${id}`).subscribe(data=>{
      this.DetailCart = data
      console.log(this.DetailCart)
      })
      
    })
  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  onClickCancel() {
    this.location.back()
  }
}



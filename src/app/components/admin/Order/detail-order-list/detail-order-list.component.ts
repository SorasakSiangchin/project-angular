import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';
import { DataList } from '../../../../Models/Orders&Lists'

@Component({
  selector: 'app-detail-order-list',
  templateUrl: './detail-order-list.component.html',
  styleUrls: ['./detail-order-list.component.css']
})
export class DetailOrderListComponent implements OnInit {
  DataList: DataList[] = []
  NumberList!: number
  PriceTotal!:number
  constructor(private activatedroute: ActivatedRoute, private http: HttpClient, private location: Location,private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.http.get<any>(`${this.cs63.ListUrl}/${id}`).subscribe(data => {
        data.map((itam: any) => { itam.idProduckNavigation.image = this.imageProduct(itam.idProduckNavigation.image) })
        this.DataList = data
        this.NumberList = this.DataList.length
      });
    })
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back()
  }

  imageProduct(image: any) {
    if (image) return `${this.cs63.hostUrl}/${image}`
    return "assets/img/no-image.jpg";
  }

  DetailProduct(data: any) {
    Swal.fire({
      title: '<div class="armfont01">' + 'ชื่อ : ' + '<strong class="text-success">' + data.name + '</strong>' + '</div>' +
        '<div class="armfont01">' + 'สี : ' + '<strong class="text-success">' + data.color + '</strong>' + '</div>' +
        '<div class="armfont01">' + 'รูปร่าง : ' + '<strong class="text-success">' + data.shape + '</strong>' + '</div>',

    })
  }

  ProductPriceTotal(data: any) {
    let formData: FormData = new FormData();
    formData.append("PriceProduct",`${data.priceProduct}`);
    formData.append("NumberProduct",`${data.numberProduct}`);
    this.http.post<any>(`${this.cs63.ListUrl}`,formData).subscribe(data=>{
      Swal.fire('<div class="armfont02 text-success">' + data.total + '</div>')
    });
  }
  
}

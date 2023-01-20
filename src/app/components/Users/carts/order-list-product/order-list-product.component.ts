import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { OrderData } from '../../../../Models/Orders&Lists';
import { Cs63Service } from 'src/app/service/cs63.service';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-order-list-product',
  templateUrl: './order-list-product.component.html',
  styleUrls: ['./order-list-product.component.css']
})

export class OrderListProductComponent implements OnInit {
  DataListProduct: OrderData[] = []
  NumberDataList!:number
  idOrder:any
  backendUrl = environment.backendUrl;
  constructor(private activatedroute: ActivatedRoute, private cart: CartService, private http: HttpClient , private cs63:Cs63Service) {
    this.activatedroute.params.subscribe(async params => {
      let id = params.id
      this.idOrder = id
      this.feedProductList(this.idOrder)
    })
  }

  ngOnInit(): void {
  }

  CancelProductList(i: any) {
    Swal.fire({
      title: 'คุณจะลบหรือไม่?',
      text: "ลบไปแล้วไม่สามารถนำข้อมูลกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบข้อมูล!'
    }).then( (result) => {
      if (result.isConfirmed) {
        //------------ ส่งข้อมูลไป Backend เพื่อ ลบสินค้าชิ้นนั้นและนำราคาของสินค้าชิ้นนั้นมาหักออกจากราคารวมทั้งหมด ----
        let formData: FormData = new FormData();
        formData.append("id", i.id);
        formData.append("idOrder",i.idOrder);
        formData.append("priceProduct",i.priceProduct);
        formData.append("numberProduct",i.numberProduct);
         this.http.put<any>(`${this.cs63.ListUrl}`,formData).subscribe(() => {
          this.feedProductList(this.idOrder)
        })
      }
    })
  }

  feedProductList(id: string) {
    this.http.get<any>(`${this.cs63.ListUrl}/${id}`).subscribe(data => {
      this.DataListProduct = data
      this.NumberDataList = this.DataListProduct.length
    })
   
  }
}

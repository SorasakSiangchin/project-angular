import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../../../../Models/Orders&Lists'
import Swal from 'sweetalert2';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  DataOrder: Orders[] = []
  NumDataOrder!: number
  constructor(private http: HttpClient, private cs63: Cs63Service) {

  }

  ngOnInit(): void {
    this.feedData()
  }
  //---------------- รับข้อมูลจาก backend มาแสดง ------------------------------
  feedData() {
    var IdUserColors = parseInt(localStorage.getItem("UserID")!)
    
    this.http.get<any>(`${this.cs63.OrderUrl}/1`).subscribe(async data => {
      this.DataOrder = await data
      this.NumDataOrder = this.DataOrder.length
      console.log("66"+this.DataOrder)
    },
    error => {
      alert(JSON.stringify(error.error.message))
    },
    () => {
      console.log('complete')
    })
  }
  //-------------------------------------------------------------------------

  //----------------------delete list Product--------------------------------
  DeleteOrderList(id: string) {
    Swal.fire({
      title: 'คุณจะลบหรือไม่?',
      text: "ลบไปแล้วไม่สามารถนำข้อมูลกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบข้อมูล!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.http.delete(`${this.cs63.OrderUrl}/${id}`).subscribe(() => {
          this.feedData()
        })
      }
    })
  }
  //-------------------------------------------------------------------------

}

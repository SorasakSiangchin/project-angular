import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';
import { DeliverysModel, StatusDeliverysModel, DeliverysModelX2 } from '../../../../Models/Deliverry';
import { HttpClient } from '@angular/common/http';
import { Cs63Service } from 'src/app/service/cs63.service';

@Component({
  selector: 'app-deliveryr-order',
  templateUrl: './deliveryr-order.component.html',
  styleUrls: ['./deliveryr-order.component.css']
})
export class DeliveryrOrderComponent implements OnInit {

  // ------------- เก็บข้อมูลของ StatusDelivery -----------------
  DataStatusDeliverry: StatusDeliverysModel[] = []

  mDeliverry: DeliverysModel = {
    id: "",
    idOrder: "",
    idStatus: "",
    date: "",
  }

  //-------------- เก็บข้อมูล Delivery เพื่อ มาโชว์ในหน้า HTML ------
  DataDeliverry!: DeliverysModelX2

  constructor(private activatedroute: ActivatedRoute, private cart: CartService,
    private location: Location, private http: HttpClient , private cs63:Cs63Service) {

    this.activatedroute.params.subscribe(async (params) => {
      let id = params.id
      this.mDeliverry.idOrder = id

      //---ข้อมูล StatusDelivery เอามาแสดงเป็น Dropdowns---
      this.feetStatusDeliverry()

      //---ข้อมูล Delivery เอามาแสดงหน้า HTML---
      this.feetDataDelivery(this.mDeliverry.idOrder)
    })

  }

  ngOnInit(): void {

  }

  //--------------- ข้อมูล StatusDelivery เอามาแสดงเป็น Dropdowns -----------------
  feetStatusDeliverry() {
    this.cart.getStatusDeliverryData().subscribe(data => {
      this.DataStatusDeliverry = data
    },
      error => {
        alert(JSON.stringify(error.error.message))
      },
      () => {
        console.log('complete')
      })
  }
  //----------------------------------------------------------------------------

  //--------------------------- ข้อมูล Delivery เอามาแสดงหน้า HTML ---------------
  feetDataDelivery(idOrder: string) {
    this.http.get<any>(`${this.cs63.DeliveryX2Url}/${idOrder}`).subscribe((data) => {
      this.DataDeliverry = data
    })
  }
  //----------------------------------------------------------------------------
  onAddDeliverry(data: any) {
    if (data.invalid) return;
    this.http.get<any>(`${this.cs63.DeliveryUrl}/${this.mDeliverry.idOrder}`).subscribe(data => {
      if (data.msg == "รหัสซ้ำ") {
        //----- ถ้ามัน รหัสซ้ำหรือมีข้อมูลใน DataBate อยู่แล้วให้ Putหรือแก้ไข ------
        this.mDeliverry.id = data.result.id
        this.cart.PutDeliverryOrder(this.mDeliverry).subscribe(() => {
          this.feetDataDelivery(this.mDeliverry.idOrder)
        });
      }
      else {
        //----- ถ้ามัน OK หรือไม่มีข้อมูลในDatabate ให้ Port ---------
        this.cart.AddDeliverryOrder(this.mDeliverry).subscribe(
          (response) => {
            if (response.msg == "OK") {
              Swal.fire({
                icon: 'success',
                title: '<div class="armfont01">' + 'เพิ่มข้อมูลเรียบร้อย' + '</div>',
                showConfirmButton: false,
                timer: 1500
              })
              this.location.back()
              this.feetDataDelivery(this.mDeliverry.idOrder)
            } else {
              Swal.fire({
                icon: 'error',
                title: '<div class="armfont01">' + 'ไม่สามารถเพิ่มข้อมูลได้' + '</div>',
                footer: '<div class="armfont01">' + '<strong>' + response.msg + '</strong>' + '</div>'
              })
            }
          },
          (error) => {
            alert('Http error')
          }
        )
      }
    })

  }

  back() {
    this.location.back()
  }
}

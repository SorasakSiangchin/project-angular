import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-product-detail',
  templateUrl: './data-product-detail.component.html',
  styleUrls: ['./data-product-detail.component.css']
})

export class DataProductDetailComponent implements AfterViewInit {
  DeTailDaTa: any
  IdProduct!: number;
  NumderDeTailDaTa!: number
  check: any
  constructor(
    private activatedRoute: ActivatedRoute, private cs63: Cs63Service, private location: Location
  ) {
    this.activatedRoute.params.subscribe(async params => {
      let id = params.id
      this.Detail(id)
    });

  }

  ngAfterViewInit(): void {

  }

  public get timestamp(): string {
    return Date.now().toString()
  }

  Detail(id: number) {
    this.IdProduct = id
    this.cs63.getDetailProductByid(id).subscribe(data => {
      data.map(item => item.image = this.cs63.getDetailProductImageUrl(item.image))
      // นำข้อมูลจาก data มาใส่ใน this.DeTailDaTa
      this.DeTailDaTa = data
      this.NumderDeTailDaTa = data.length
    })
  }

  deleteDetailProductId(i: any) {
    Swal.fire({
      title: 'คุณจะลบหรือไม่?',
      text: "ลบไปแล้วไม่สามารถนำข้อมูลกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบข้อมูล!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs63.deleteDetailProductId(i.id).toPromise().then(() => {
          this.Detail(i.idProduct)
        });
        // this.feedData() คือการล้างค่าเก่า

      }
    })
  }

  // ----- ลบ DetailProductc แค่ตัวเดียว ------------------
  deleteProductAll(i: any) {
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
        await this.cs63.deleteDetailProductAll(i).toPromise().then(() => {
          // this.feedData() คือการล้างค่าเก่า
          this.Detail(i)
        });

      }
    })
  }

  //---- ลบทั้งหมด -----
  Detailclick() {
    this.deleteProductAll(this.IdProduct)
  }

  onClickCancel() {
    this.location.back()
  }
}



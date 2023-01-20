import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProductModel, IdOrderProduct } from '../../../../Models/OrderProduct';
import Swal from 'sweetalert2';
import { Cs63Service } from 'src/app/service/cs63.service';
@Component({
  selector: 'app-data-order-product',
  templateUrl: './data-order-product.component.html',
  styleUrls: ['./data-order-product.component.css']
})
export class DataOrderProductComponent implements OnInit {

  //------------ เก็บไอดีของ OrderProduct ------------
  Id: IdOrderProduct = {
    idOrPro: ""
  }
  IdOrderProduct: any[] = []
  dataid: any
  //-----------------------------------------------

  //------------- ConfirmId ---------------------
  ConfirmOrderID: IdOrderProduct[] = []
  //---------------------------------------------

  //---------------เก็บจำนวนข้อมูลใน Local --------
  numIdlocal: any
  //--------------------------------------------

  DataOrderProduct: OrderProductModel[] = []

  constructor(private http: HttpClient,private cs63:Cs63Service) { }

  ngOnInit(): void {
    this.feeddata()
    this.feedDataLocal()
  }
  //------------- ดึงข้อมูลของOrderProductมาแสดง -----------------
  feeddata() {
    this.http.get<any[]>(`${this.cs63.OrderProductUrl}`).subscribe(data => {
      this.DataOrderProduct = data
      console.log(this.DataOrderProduct)
    });
  }
  //-----------------------------------------------------------

  //------------ ปุ่ม สินค้ามาถึงแล้ว --------------------------------
  ProductArrived(data: OrderProductModel) {

    data.idStatus = 2;
    this.http.put(`${this.cs63.OrderProductUrl}`, this.makeFormOrderProduct(data)).subscribe(() => {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      ).then(() => {

        this.IdOrderProduct.push(data.id)
        localStorage.setItem("IdOrPro", JSON.stringify(this.IdOrderProduct))

        //---- รีเฟรดข้อมูล ----
        this.feeddata()
        this.feedDataLocal()

      })
    })
  }
  //------------------------------------------
  ConfirmOrder() {
    this.ConfirmOrderID = JSON.parse(localStorage.getItem("IdOrPro")!);
    if (this.ConfirmOrderID.length > 0) {
      let formData = new FormData()
      for (let i = 0; i < this.ConfirmOrderID.length; i++) {
        formData.append("idOrderProduct", `${this.ConfirmOrderID[i]}`);
      }
      this.http.put<any>(`${this.cs63.OrderProductX2Url}`, formData).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าเรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.removeItem("IdOrPro")
          this.feeddata()
          this.feedDataLocal()
        })
      })
    }

  }

  feedDataLocal() {
    this.ConfirmOrderID = JSON.parse(localStorage.getItem("IdOrPro")!);
    this.numIdlocal = this.ConfirmOrderID.length
  }

  makeFormOrderProduct(value: OrderProductModel) {
    let formData: FormData = new FormData();
    formData.append("id", value.id);
    formData.append("idStatus", value.idStatus.toString());
    formData.append("idProduct", value.idProduct.toString());
    formData.append("date", value.date);
    formData.append("stock", value.stock.toString());
    return formData;
  }

  //---------- DeleteOrderProduct --------------
  DeleteOrderProduct(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          this.http.delete<void>(`${this.cs63.OrderProductX2Url}/${id}`).subscribe(() => {
            this.feeddata()
            this.feedDataLocal()
          })
        })
      }
    })

  }
  //--------------------------------------------
}

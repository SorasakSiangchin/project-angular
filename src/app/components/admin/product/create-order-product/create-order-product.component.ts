import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProduct } from '../../../../Models/OrderProduct';
import { Product } from '../../../../Models/Products';
import { Cs63Service } from 'src/app/service/cs63.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-order-product',
  templateUrl: './create-order-product.component.html',
  styleUrls: ['./create-order-product.component.css']
})
export class CreateOrderProductComponent implements OnInit {
  mProduct: Product[] = []
  mOrderProduct: OrderProduct = {
    id: "",
    idStatus: 0,
    idProduct: 0,
    date: "",
    stock: 0,
  }
  constructor(private location: Location, private http: HttpClient, private cs63: Cs63Service) {
    this.feedProduct()
  }
  //-------------------- FormHTML --------------------------------
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //---------------------------------------------------------------
  ngOnInit(): void {
  }
  OrderProductForm(value: any) {
    if (value.invalid) return;
    this.cs63.addOrderProduct(this.mOrderProduct).subscribe((response) => {
      if (response.msg == this.cs63.OK) {
        Swal.fire({
          icon: 'success',
          title: 'สั่งซื้อสินค้าเพิ่มสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเพิ่มสมาชิกได้',
          text: response.msg,
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    },
      (error) => {
        alert('Http error')
      })
  }

  onClickCancel() {
    this.location.back()
  }

  feedProduct() {
    this.http.get<any>(`${this.cs63.productUrl}`).subscribe(data => {
      this.mProduct = data
    },
      error => {
        alert(JSON.stringify(error.error.message))
      },
      () => {
        console.log('complete')
      })
  }
}

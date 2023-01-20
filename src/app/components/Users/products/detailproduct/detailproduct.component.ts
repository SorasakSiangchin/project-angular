import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';
import { DataProduct } from '../../../../Models/productLocal'


@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;

  //----- เก็บข้อมูลสินค้า -----
  DProduct: DataProduct = {
    idProduck: 0,
    numberProduct: 1,
    priceProduct: 0,
    userId: ""
  }
  //--------เอาไว้รับค่าจาก path----------------
  DetailProduct: any
  id: any
  name: any
  price: any
  stock: any
  color: any
  shape: any
  image: any
  //-----------------------------------------


  constructor(private activatedRoute: ActivatedRoute, private location: Location, private cart: CartService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.id = params.id
      this.name = params.name
      this.price = params.price
      this.stock = params.stock
      this.color = params.color
      this.shape = params.shape
      this.image = params.image
      this.DProduct.idProduck = params.id
      this.DProduct.priceProduct = params.price
      this.DProduct.userId = localStorage.getItem("UserID")
    })
  }



  addToCart(a: number) {
    Swal.fire({
      icon: 'success',
      title: '<div class="armfont01">เพิ่มสินค้าสำเร็จ</div>',
      showConfirmButton: false,
      timer: 1000
    })
    this.DProduct.numberProduct = a
    this.cart.addToCart(this.DProduct);
  }

  // onAddProductLocal(value: any) {
  //   this.DProduct.push({ id: value.id, stock: value.stock, price: 5 })
  //   localStorage.setItem("888888", `${this.DProduct}`)
  // }


  back() {
    this.location.back()
  }

  formatLabel(value: number) {
    if (value) {
      this.DProduct.priceProduct = value
    }

    return value;
  }



  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}

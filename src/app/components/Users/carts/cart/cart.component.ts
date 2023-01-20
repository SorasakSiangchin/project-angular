
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Cs63Service } from 'src/app/service/cs63.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements AfterViewInit {
  DataCart: any
  checkLocalCart: any
  //ListData: OrderList[] = []
  
  UserId: any
  constructor(public cart: CartService, private cs63: Cs63Service) {
    this.DataCart = this.cart.getItemslocal()
    this.cart.numberLocal()
  }

  ngAfterViewInit() {

  }

  DeleteLocal() {
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
        this.DataCart = localStorage.removeItem("CarT")
        this.cart.NumberLacal = 0
      }
    })
  }

}

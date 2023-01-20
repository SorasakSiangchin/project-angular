import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
//import { Observable } from 'rxjs';
import { OrderUpfile } from '../../../../Models/Orders&Lists';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Cs63Service } from 'src/app/service/cs63.service';
//import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-data-order-of-user',
  templateUrl: './data-order-of-user.component.html',
  styleUrls: ['./data-order-of-user.component.css']
})
export class DataOrderOfUserComponent implements OnInit {
  DataOrder: OrderUpfile[]=[]
  NumberOrder!:number
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient, private cart: CartService,private cs63:Cs63Service) {
    this.feedOrderUser()
  }

  // UpFileOrder!: OrderUpfile 
  ngOnInit(): void {
    
  }

  feedOrderUser() {
    this.http.get<any>(this.cs63.OrderUrl).subscribe(data => {
      this.DataOrder = data
      this.NumberOrder = this.DataOrder.length;
    })
  }



  public get timestamp(): string {
    return Date.now().toString()
  }

  ConfirmOrder(i: any) {
    i.statusMoney = true
    this.makeFormUpFileOrder(i)
  }
  //---------------- ปุ่มยืนยันสินค้า --------------------
  makeFormUpFileOrder(value: OrderUpfile) {
    let formData: FormData = new FormData();
    formData.append("id", value.id);
    formData.append("idUser", value.idUser.toString());
    formData.append("statusMoney", value.statusMoney.toString());
    formData.append("date", value.date);
    if(value.proofTransfer == null) value.proofTransfer = "";
    formData.append("proofTransfer", value.proofTransfer);
    formData.append("priceTotal", value.priceTotal.toString());
    formData.append("upfile", value.upfile);

    for (let data of value.list) {
      formData.append("idList", data.id);
      formData.append("idProduckList", data.idProduck.toString());
      formData.append("numberProductList", data.numberProduct.toString());
      formData.append("PriceProductList", data.priceProduct.toString());
    }
    this.http.put(`${this.cs63.OrderUrl}`, formData).subscribe(() => {
      Swal.fire('ยืนยันการชำระเงินสำเร็จ').then(() => {
        this.feedOrderUser()
      })
    });
  }
}
